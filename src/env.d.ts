import 'react-native-config';

declare module 'react-native-config' {
  type ConfigKeys =
    | 'API_HOST'
    | 'APP_NAME'
    | 'NODE_ENV'
    | 'REACT_NATIVE_APP_AUTH0_CLIENT_ID'
    | 'REACT_NATIVE_APP_AUTH0_DOMAIN'
    | 'REACT_NATIVE_APP_AUTH0_AUDIENCE'
    | 'REACT_NATIVE_APP_ENCRYPTION_KEY'
    | 'REACT_NATIVE_APP_VERSION_NR';

  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  export interface NativeConfig extends Record<ConfigKeys, string | undefined> {}
}
