import Constants from 'expo-constants';
import { NativeConfig } from './env.d';

// Prefer values provided via `app.config.ts` extras (available at runtime as
// Constants.expoConfig.extra). Fall back to process.env for node-based scripts.
const extras =
  (Constants.expoConfig && (Constants.expoConfig as any).extra) ||
  (Constants.manifest && (Constants.manifest as any).extra) ||
  {};

function get(key: string): string | undefined {
  // extras (from app.config.ts) -> process.env -> undefined
  const fromExtras = (extras as Record<string, unknown>)[key];
  if (typeof fromExtras !== 'undefined') return String(fromExtras);
  const fromEnv = process.env[key];
  if (typeof fromEnv !== 'undefined') return String(fromEnv);
  return undefined;
}

export const Config: NativeConfig = {
  API_HOST: get('API_HOST'),
  API_HOST_UITDATABANK: get('API_HOST_UITDATABANK'),
  APP_NAME: get('APP_NAME'),
  NODE_ENV: get('NODE_ENV'),
  REACT_NATIVE_APP_AUTH0_CLIENT_ID: get('REACT_NATIVE_APP_AUTH0_CLIENT_ID'),
  REACT_NATIVE_APP_AUTH0_DOMAIN: get('REACT_NATIVE_APP_AUTH0_DOMAIN'),
  REACT_NATIVE_APP_AUTH0_AUDIENCE: get('REACT_NATIVE_APP_AUTH0_AUDIENCE'),
  REACT_NATIVE_APP_ENCRYPTION_KEY: get('REACT_NATIVE_APP_ENCRYPTION_KEY'),
  REACT_NATIVE_APP_VERSION_NR: get('REACT_NATIVE_APP_VERSION_NR'),
  REACT_NATIVE_APP_LOGGING_LEVEL: get('REACT_NATIVE_APP_LOGGING_LEVEL'),
  SENTRY_DSN: get('SENTRY_DSN'),
  TRACKING_HOST: get('TRACKING_HOST'),
};
