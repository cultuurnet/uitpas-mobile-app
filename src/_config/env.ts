import Constants from 'expo-constants';

const extras = (Constants.expoConfig && Constants.expoConfig.extra) || {};

function get(key: string): string | undefined {
  // extras (from app.config.ts) -> undefined
  const fromExtras = (extras as Record<string, unknown>)[key];
  if (typeof fromExtras !== 'undefined') return String(fromExtras);
  return undefined;
}

export const Config = {
  API_HOST: get('API_HOST'),
  API_HOST_UITDATABANK: get('API_HOST_UITDATABANK'),
  APP_NAME: get('APP_NAME'),
  APP_PACKAGE_NAME: get('APP_PACKAGE_NAME'),
  NODE_ENV: get('NODE_ENV'),
  REACT_NATIVE_APP_AUTH_CLIENT_ID: get('REACT_NATIVE_APP_AUTH_CLIENT_ID'),
  REACT_NATIVE_APP_AUTH_ISSUER: get('REACT_NATIVE_APP_AUTH_ISSUER'),
  REACT_NATIVE_APP_ENCRYPTION_KEY: get('REACT_NATIVE_APP_ENCRYPTION_KEY'),
  REACT_NATIVE_APP_LOGGING_LEVEL: get('REACT_NATIVE_APP_LOGGING_LEVEL'),
  REACT_NATIVE_APP_VERSION_NR: get('REACT_NATIVE_APP_VERSION_NR'),
  SENTRY_DSN: get('SENTRY_DSN'),
  TRACKING_HOST: get('TRACKING_HOST'),
};
