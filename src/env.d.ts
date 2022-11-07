import 'react-native-config';

declare module 'react-native-config' {
  export interface NativeConfig {
    API_HOST: string | undefined;
    APP_NAME: string | undefined;
    NODE_ENV: string | undefined;
    REACT_NATIVE_APP_AUTH0_CLIENT_ID: string | undefined;
    REACT_NATIVE_APP_AUTH0_DOMAIN: string | undefined;
    REACT_NATIVE_APP_VERSION_NR: string | undefined;
  }
}
