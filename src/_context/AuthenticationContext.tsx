import { createContext, FC, PropsWithChildren, useCallback, useContext, useEffect, useRef, useState } from 'react';
import { Platform } from 'react-native';
import * as AuthSession from 'expo-auth-session';
import * as WebBrowser from 'expo-web-browser';

import { Config } from '../_config';
import { useToggle } from '../_hooks';
import { useAppState } from '../_hooks/useAppState';
import { TUser } from '../_models';
import { log } from '../_utils';
import { storage } from '../storage';
import { QUERY_PERSIST_KEY, queryClient } from './QueryClientProvider';
import { getIdTokenProfileClaims } from './util';

WebBrowser.maybeCompleteAuthSession();

const STORAGE_KEYS = {
  ACCESS_TOKEN: 'auth.accessToken',
  EXPIRES_AT: 'auth.expiresAt',
  ID_TOKEN: 'auth.idToken',
  REFRESH_TOKEN: 'auth.refreshToken',
} as const;

// Error codes that mean the refresh token itself is rejected, so the local session is unusable.
const REVOKED_REFRESH_TOKEN_CODES = ['invalid_grant', 'invalid_client', 'unauthorized_client'];

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

  const isAuthenticatedRef = useRef(isAuthenticated);
  const sessionEpochRef = useRef(0);
  const discoveryPromiseRef = useRef<Promise<AuthSession.DiscoveryDocument | undefined> | undefined>(undefined);
  const checkPromiseRef = useRef<Promise<void> | undefined>(undefined);

  const issuer = Config.REACT_NATIVE_APP_AUTH_ISSUER || '';
  const redirectUri = `${Config.APP_PACKAGE_NAME}://${Config.REACT_NATIVE_APP_AUTH_ISSUER?.replace('https://', '')}/${Platform.OS}/${Config.APP_PACKAGE_NAME}/callback`;
  const discovery = AuthSession.useAutoDiscovery(issuer);

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

  useEffect(() => {
    isAuthenticatedRef.current = isAuthenticated;
  }, [isAuthenticated]);

  // The auto discovery hook returns null while it is still loading, so on cold start we resolve the
  // document ourselves instead of bailing out of the session restore.
  const resolveDiscovery = useCallback(async () => {
    if (discovery) return discovery;

    if (!issuer) {
      log.error('Discovery unavailable: REACT_NATIVE_APP_AUTH_ISSUER is not configured');
      return undefined;
    }

    if (!discoveryPromiseRef.current) {
      discoveryPromiseRef.current = AuthSession.fetchDiscoveryAsync(issuer).catch(e => {
        log.error('Discovery fetch failed:', e);
        discoveryPromiseRef.current = undefined;
        return undefined;
      });
    }

    return discoveryPromiseRef.current;
  }, [discovery, issuer]);

  const clearSession = useCallback(() => {
    // Invalidate any refresh or authorization that is still in flight.
    sessionEpochRef.current += 1;

    // Clear local storage
    storage.remove(STORAGE_KEYS.ACCESS_TOKEN);
    storage.remove(STORAGE_KEYS.ID_TOKEN);
    storage.remove(STORAGE_KEYS.REFRESH_TOKEN);
    storage.remove(STORAGE_KEYS.EXPIRES_AT);

    // Clear persisted react query cache from storage
    storage.remove(QUERY_PERSIST_KEY);

    // Clear react query cache
    queryClient.clear();
    queryClient.removeQueries();

    // Reset state
    setIsAuthenticated(false);
    setAccessToken(undefined);
    setRefreshToken(undefined);
    setUser(undefined);
  }, [setIsAuthenticated]);

  const logout = useCallback(async () => {
    const refreshTokenToRevoke = refreshToken;

    // Signing out never waits on the network: the local session goes first.
    clearSession();

    if (!refreshTokenToRevoke) return;

    const authDiscovery = discovery ?? (await resolveDiscovery());

    if (!authDiscovery) {
      log.error('Token revocation skipped: discovery is not available');
      return;
    }

    try {
      await AuthSession.revokeAsync(
        { clientId: Config.REACT_NATIVE_APP_AUTH_CLIENT_ID || '', token: refreshTokenToRevoke },
        authDiscovery,
      );
    } catch (e) {
      log.error('Token revocation failed:', e);
    }
  }, [clearSession, refreshToken, discovery, resolveDiscovery]);

  const saveTokens = useCallback(
    (tokens: { accessToken: string; expiresIn?: number; idToken?: string; refreshToken?: string }) => {
      const previousSub = (() => {
        const storedIdToken = storage.getString(STORAGE_KEYS.ID_TOKEN);
        if (!storedIdToken) return undefined;

        try {
          return (getIdTokenProfileClaims(storedIdToken) as TUser).sub;
        } catch (e) {
          log.error('Failed to read stored id token:', e);
          return undefined;
        }
      })();

      const profile = tokens.idToken ? (getIdTokenProfileClaims(tokens.idToken) as TUser) : undefined;
      // A refresh may omit the id token; the identity then stays the one already stored.
      const nextSub = profile ? profile.sub : previousSub;

      // A new identity never inherits the previous account's persisted query cache.
      if (!previousSub || previousSub !== nextSub) {
        storage.remove(QUERY_PERSIST_KEY);
        queryClient.clear();
        queryClient.removeQueries();
      }

      storage.set(STORAGE_KEYS.ACCESS_TOKEN, tokens.accessToken);
      if (tokens.idToken) storage.set(STORAGE_KEYS.ID_TOKEN, tokens.idToken);
      if (tokens.refreshToken) storage.set(STORAGE_KEYS.REFRESH_TOKEN, tokens.refreshToken);
      if (tokens.expiresIn) {
        const expiresAt = Date.now() + tokens.expiresIn * 1000;
        storage.set(STORAGE_KEYS.EXPIRES_AT, expiresAt.toString());
      }

      setAccessToken(tokens.accessToken);
      if (tokens.refreshToken) setRefreshToken(tokens.refreshToken);
      if (profile) setUser(profile);
      setIsAuthenticated(true);
    },
    [setIsAuthenticated],
  );

  const refreshAccessToken = useCallback(async () => {
    const epoch = sessionEpochRef.current;
    const storedRefreshToken = storage.getString(STORAGE_KEYS.REFRESH_TOKEN);
    if (!storedRefreshToken) {
      clearSession();
      return false;
    }

    try {
      const authDiscovery = await resolveDiscovery();

      if (!authDiscovery) {
        log.error('Token refresh skipped: discovery is not available');
        return false;
      }

      const tokenResult = await AuthSession.refreshAsync(
        {
          clientId: Config.REACT_NATIVE_APP_AUTH_CLIENT_ID || '',
          refreshToken: storedRefreshToken,
        },
        authDiscovery,
      );

      // The session was cleared while the refresh was in flight; that teardown wins.
      if (epoch !== sessionEpochRef.current) {
        return false;
      }

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

      // Only a rejected refresh token invalidates the local session. Network and provider errors keep the tokens.
      if (e instanceof AuthSession.TokenError && REVOKED_REFRESH_TOKEN_CODES.includes(e.code)) {
        clearSession();
      }

      return false;
    }
  }, [clearSession, resolveDiscovery, saveTokens]);

  const checkAndRenewCredentials = useCallback(() => {
    // Overlapping boot/foreground checks must await the same restore instead of settling separately.
    if (checkPromiseRef.current) {
      return checkPromiseRef.current;
    }

    const check = (async () => {
      try {
        const storedAccessToken = storage.getString(STORAGE_KEYS.ACCESS_TOKEN);
        const storedIdToken = storage.getString(STORAGE_KEYS.ID_TOKEN);
        const storedRefreshToken = storage.getString(STORAGE_KEYS.REFRESH_TOKEN);
        const expiresAt = storage.getString(STORAGE_KEYS.EXPIRES_AT);

        if (!storedAccessToken || !storedRefreshToken) {
          setIsAuthenticated(false);
          return;
        }

        // Check if token is expired or about to expire (within 5 minutes)
        const isExpired = expiresAt ? Date.now() >= parseInt(expiresAt) - 5 * 60 * 1000 : false;

        if (isExpired) {
          const refreshed = await refreshAccessToken();

          // Settle on Login only while not authenticated; a transient foreground failure keeps the session.
          if (!refreshed && !isAuthenticatedRef.current) {
            setIsAuthenticated(false);
          }
        } else {
          setAccessToken(storedAccessToken);
          setRefreshToken(storedRefreshToken);
          if (storedIdToken) setUser(getIdTokenProfileClaims(storedIdToken) as TUser);
          setIsAuthenticated(true);
        }
      } catch (e) {
        log.error(e);
        clearSession();
      } finally {
        setIsInitialized(true);
      }
    })().finally(() => {
      checkPromiseRef.current = undefined;
    });

    checkPromiseRef.current = check;

    return check;
  }, [clearSession, refreshAccessToken, setIsAuthenticated, setIsInitialized]);

  useAppState({
    onForeground: () => {
      checkAndRenewCredentials();
    },
  });

  useEffect(() => {
    if (!isInitialized) {
      checkAndRenewCredentials();
    }
  }, [checkAndRenewCredentials, isInitialized]);

  const authorize = useCallback(async () => {
    try {
      const epoch = sessionEpochRef.current;

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

        // The session was cleared while the browser was open; never revive it.
        if (epoch !== sessionEpochRef.current) {
          log.info('Authorization result discarded: the session was cleared');
          return;
        }

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
