import { createContext, FC, PropsWithChildren, useContext, useEffect, useMemo, useState } from 'react';
import Auth0 from 'react-native-auth0';
import { Config } from 'react-native-config';

import { useToggle } from '../_hooks';
import { TAuth0User } from '../_models';
import { queryClient } from '../_providers/QueryClientProvider';
import { getIdTokenProfileClaims } from './util';

// Types are not optimal, because the @types/react-native-auth0 packages is not up-to-date.
// We should improve this later..
type TAuthenticationContext = {
  accessToken?: string;
  authorize: (parameters?: object, options?: object) => void;
  isAuthenticated?: boolean;
  isInitialized: boolean;
  logout: (...options) => Promise<void>;
  user?: TAuth0User;
};

export const AuthenticationContext = createContext<TAuthenticationContext>({
  authorize: async () => {},
  isInitialized: false,
  logout: async () => {},
});

export const useAuthentication = () => useContext(AuthenticationContext);

const AuthenticationProvider: FC<PropsWithChildren> = ({ children }) => {
  const [accessToken, setAccessToken] = useState<string>();
  const [user, setUser] = useState<TAuth0User>();
  const [isInitialized, setIsInitialized] = useToggle(false);
  const [isAuthenticated, setIsAuthenticated] = useToggle(false);

  const client = useMemo(
    () =>
      new Auth0({
        clientId: Config.REACT_NATIVE_APP_AUTH0_CLIENT_ID,
        domain: Config.REACT_NATIVE_APP_AUTH0_DOMAIN,
      }),
    [],
  );

  useEffect(() => {
    if (!client) return;

    (async () => {
      const isLoggedIn = await client.credentialsManager.hasValidCredentials();
      setIsAuthenticated(isLoggedIn);
      setIsInitialized(true);

      if (isLoggedIn) {
        const credentials = await client.credentialsManager.getCredentials();

        if (credentials) {
          setUser(getIdTokenProfileClaims(credentials.idToken));
          setAccessToken(credentials.accessToken);
        }
      }
    })();
  }, [client]);

  const authorize = async (...options) => {
    try {
      const credentials = await client.webAuth.authorize(...options);
      await client.credentialsManager.saveCredentials(credentials);
      setAccessToken(credentials.accessToken);
      setIsAuthenticated(true);
      setUser(getIdTokenProfileClaims(credentials.idToken));
    } catch (e) {
      console.error(e);
    }
  };

  const logout = async () => {
    try {
      await client.credentialsManager.clearCredentials();
      await queryClient.removeQueries();
      setIsAuthenticated(false);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <AuthenticationContext.Provider
      value={{
        accessToken,
        authorize,
        isAuthenticated,
        isInitialized,
        logout,
        user,
      }}
    >
      {children}
    </AuthenticationContext.Provider>
  );
};

export default AuthenticationProvider;
