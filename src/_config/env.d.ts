// Minimal typing for our Config wrapper (replaces react-native-config types)
export type ConfigKey =
  | 'API_HOST'
  | 'API_HOST_UITDATABANK'
  | 'APP_NAME'
  | 'NODE_ENV'
  | 'REACT_NATIVE_APP_AUTH0_CLIENT_ID'
  | 'REACT_NATIVE_APP_AUTH0_DOMAIN'
  | 'REACT_NATIVE_APP_AUTH0_AUDIENCE'
  | 'REACT_NATIVE_APP_ENCRYPTION_KEY'
  | 'REACT_NATIVE_APP_VERSION_NR'
  | 'REACT_NATIVE_APP_LOGGING_LEVEL'
  | 'SENTRY_DSN'
  | 'TRACKING_HOST';

export type NativeConfig = Record<ConfigKey, string | undefined>;
