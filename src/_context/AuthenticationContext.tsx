import { createContext, FC, PropsWithChildren, useCallback, useContext, useEffect, useState } from 'react';
import { Platform } from 'react-native';
import { QueryCache } from '@tanstack/react-query';
import * as AuthSession from 'expo-auth-session';
import * as WebBrowser from 'expo-web-browser';

import { Config } from '../_config';
import { useToggle } from '../_hooks';
import { useAppState } from '../_hooks/useAppState';
import { TUser } from '../_models';
import { log } from '../_utils';
import { storage } from '../storage';
import { queryClient } from './QueryClientProvider';
import { getIdTokenProfileClaims } from './util';

WebBrowser.maybeCompleteAuthSession();

const STORAGE_KEYS = {
  ACCESS_TOKEN: 'auth.accessToken',
  EXPIRES_AT: 'auth.expiresAt',
  ID_TOKEN: 'auth.idToken',
  REFRESH_TOKEN: 'auth.refreshToken',
} as const;

type TAuthenticationContext = {
  accessToken?: string;
  authorize: () => Promise<void>;
  isAuthenticated?: boolean;
  isInitialized: boolean;
  logout: () => Promise<void>;
  user?: TUser;
};

export const AuthenticationContext = createContext<TAuthenticationContext>({
  authorize: async () => {},
  isInitialized: false,
  logout: async () => {},
});

export const useAuthentication = () => useContext(AuthenticationContext);

const AuthenticationProvider: FC<PropsWithChildren> = ({ children }) => {
  const [accessToken, setAccessToken] = useState<string>();
  const [refreshToken, setRefreshToken] = useState<string>();
  const [user, setUser] = useState<TUser>();
  const [isInitialized, setIsInitialized] = useToggle(false);
  const [isAuthenticated, setIsAuthenticated] = useToggle(false);

  const redirectUri = `${Config.APP_PACKAGE_NAME}://account-test.uitid.be/${Platform.OS}/${Config.APP_PACKAGE_NAME}/callback`;
  const discovery = AuthSession.useAutoDiscovery(Config.REACT_NATIVE_APP_AUTH_ISSUER || '');

  const [request, , promptAsync] = AuthSession.useAuthRequest(
    {
      clientId: Config.REACT_NATIVE_APP_AUTH_CLIENT_ID || '',
      redirectUri,
      responseType: AuthSession.ResponseType.Code,
      scopes: ['openid', 'profile', 'email', 'offline_access'],
      usePKCE: true,
    },
    discovery,
  );

  const logout = useCallback(async () => {
    try {
      // Revoke tokens on server
      if (refreshToken && discovery) {
        try {
          await AuthSession.revokeAsync(
            { clientId: Config.REACT_NATIVE_APP_AUTH_CLIENT_ID || '', token: refreshToken },
            discovery,
          );
        } catch (e) {
          log.error('Token revocation failed:', e);
        }
      }

      // Clear local storage
      storage.delete(STORAGE_KEYS.ACCESS_TOKEN);
      storage.delete(STORAGE_KEYS.ID_TOKEN);
      storage.delete(STORAGE_KEYS.REFRESH_TOKEN);
      storage.delete(STORAGE_KEYS.EXPIRES_AT);

      setIsAuthenticated(false);

      // Clear react query cache
      const queryCache = new QueryCache({});
      queryClient.clear();
      queryCache.clear();
      queryClient.removeQueries();

      // Reset state
      setAccessToken(undefined);
      setRefreshToken(undefined);
      setUser(undefined);
    } catch (e) {
      log.error(e);
    }
  }, [refreshToken, discovery, setIsAuthenticated]);

  const saveTokens = useCallback(
    (tokens: { accessToken: string; expiresIn?: number, idToken?: string; refreshToken?: string; }) => {
      storage.set(STORAGE_KEYS.ACCESS_TOKEN, tokens.accessToken);
      if (tokens.idToken) storage.set(STORAGE_KEYS.ID_TOKEN, tokens.idToken);
      if (tokens.refreshToken) storage.set(STORAGE_KEYS.REFRESH_TOKEN, tokens.refreshToken);
      if (tokens.expiresIn) {
        const expiresAt = Date.now() + tokens.expiresIn * 1000;
        storage.set(STORAGE_KEYS.EXPIRES_AT, expiresAt.toString());
      }

      setAccessToken(tokens.accessToken);
      if (tokens.refreshToken) setRefreshToken(tokens.refreshToken);
      if (tokens.idToken) setUser(getIdTokenProfileClaims(tokens.idToken) as TUser);
      setIsAuthenticated(true);
    },
    [setIsAuthenticated],
  );

  const refreshAccessToken = useCallback(async () => {
    const storedRefreshToken = storage.getString(STORAGE_KEYS.REFRESH_TOKEN);
    if (!storedRefreshToken) {
      await logout();
      return false;
    }

    if (!discovery) return false;

    try {
      const tokenResult = await AuthSession.refreshAsync(
        {
          clientId: Config.REACT_NATIVE_APP_AUTH_CLIENT_ID || '',
          refreshToken: storedRefreshToken,
        },
        discovery,
      );

      if (tokenResult.accessToken) {
        saveTokens({
          accessToken: tokenResult.accessToken,
          expiresIn: tokenResult.expiresIn,
          idToken: tokenResult.idToken,
          refreshToken: tokenResult.refreshToken || storedRefreshToken,
        });
        return true;
      }
      return false;
    } catch (e) {
      log.error('Token refresh failed:', e);
      await logout();
      return false;
    }
  }, [logout, saveTokens, discovery]);

  const checkAndRenewCredentials = useCallback(async () => {
    try {
      const storedAccessToken = storage.getString(STORAGE_KEYS.ACCESS_TOKEN);
      const storedIdToken = storage.getString(STORAGE_KEYS.ID_TOKEN);
      const storedRefreshToken = storage.getString(STORAGE_KEYS.REFRESH_TOKEN);
      const expiresAt = storage.getString(STORAGE_KEYS.EXPIRES_AT);

      setIsInitialized(true);

      if (!storedAccessToken || !storedRefreshToken) {
        setIsAuthenticated(false);
        return;
      }

      // Check if token is expired or about to expire (within 5 minutes)
      const isExpired = expiresAt ? Date.now() >= parseInt(expiresAt) - 5 * 60 * 1000 : false;

      if (isExpired) {
        const refreshed = await refreshAccessToken();
        if (!refreshed) return;
      } else {
        setAccessToken(storedAccessToken);
        setRefreshToken(storedRefreshToken);
        if (storedIdToken) setUser(getIdTokenProfileClaims(storedIdToken) as TUser);
        setIsAuthenticated(true);
      }
    } catch (e) {
      log.error(e);
      await logout();
    }
  }, [setIsAuthenticated, setIsInitialized, logout, refreshAccessToken]);

  useAppState({
    onForeground: () => {
      checkAndRenewCredentials();
    },
  });

  useEffect(() => {
    checkAndRenewCredentials();
  }, [checkAndRenewCredentials]);

  const authorize = useCallback(async () => {
    try {
      // Ensure request and discovery are ready before prompting
      if (!request) {
        log.error('Authorization request not ready');
        return;
      }

      if (!discovery) {
        log.error('Discovery configuration not available');
        return;
      }

      const result = await promptAsync({ preferEphemeralSession: Platform.OS === 'ios' });

      if (result.type === 'success' && result.params.code && request?.codeVerifier) {
        const tokenResult = await AuthSession.exchangeCodeAsync(
          {
            clientId: Config.REACT_NATIVE_APP_AUTH_CLIENT_ID || '',
            code: result.params.code,
            extraParams: {
              code_verifier: request.codeVerifier,
            },
            redirectUri,
          },
          discovery,
        );

        if (tokenResult.accessToken) {
          saveTokens({
            accessToken: tokenResult.accessToken,
            expiresIn: tokenResult.expiresIn,
            idToken: tokenResult.idToken,
            refreshToken: tokenResult.refreshToken,
          });
        }
      } else if (result.type === 'error') {
        log.error('Authorization error:', result.error);
      } else if (result.type === 'dismiss' || result.type === 'cancel') {
        log.info('Authorization cancelled by user');
      }
    } catch (e) {
      log.error('Authorization failed:', e);
    }
  }, [promptAsync, request, redirectUri, saveTokens, discovery]);

  return (
    <AuthenticationContext.Provider value={{ accessToken, authorize, isAuthenticated, isInitialized, logout, user }}>
      {children}
    </AuthenticationContext.Provider>
  );
};

export default AuthenticationProvider;
