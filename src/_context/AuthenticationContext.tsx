import { createContext, FC, PropsWithChildren, useContext, useEffect, useMemo, useState } from 'react';
import Auth0 from 'react-native-auth0';
import { Config } from 'react-native-config';

import { useToggle } from '../_hooks';

// Types are not optimal, because the @types/react-native-auth0 packages is not up-to-date.
// We should improve this later..
type TAuthenticationContext = {
  accessToken?: string;
  authorize: (parameters: object, options: object) => void;
  isAuthenticated?: boolean;
  isInitialized: boolean;
  logout: (...options) => void;
};

export const AuthenticationContext = createContext<TAuthenticationContext>({
  authorize: () => {},
  isInitialized: false,
  logout: () => {},
});

export const useAuthentication = () => useContext(AuthenticationContext);

const AuthenticationProvider: FC<PropsWithChildren> = ({ children }) => {
  const [accessToken, setAccessToken] = useState<string>();
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
    } catch (e) {
      console.error(e);
    }
  };

  const logout = async () => {
    try {
      await client.credentialsManager.clearCredentials();
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
      }}
    >
      {children}
    </AuthenticationContext.Provider>
  );
};

export default AuthenticationProvider;
