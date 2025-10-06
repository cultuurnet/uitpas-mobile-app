import { ExpoConfig, ConfigContext } from 'expo/config';

export default ({ config }: ConfigContext): ExpoConfig => ({
  ...config,
  name: 'UiTPAS',
  slug: 'uitpas-mobile-app',
  version: process.env.EXPO_PUBLIC_APP_VERSION,
  orientation: 'portrait',
  icon: process.env.EXPO_PUBLIC_APP_ICON,
  userInterfaceStyle: 'light',
  scheme: 'uitpas',
  // splash: { image: './assets/splash-icon.png', resizeMode: 'contain', backgroundColor: '#ffffff' },
  ios: {
    supportsTablet: false,
    bundleIdentifier: process.env.EXPO_PUBLIC_APP_PACKAGE_NAME,
    infoPlist: {
      NSCameraUsageDescription: 'UiTPAS needs camera access to scan QR codes',
      NSPhotoLibraryUsageDescription: 'UiTPAS needs access to your photo library',
      NSPhotoLibraryAddUsageDescription: 'UiTPAS needs permission to save photos',
      NSAppTransportSecurity: {
        NSAllowsArbitraryLoads: false,
        NSAllowsLocalNetworking: process.env.EXPO_PUBLIC_NODE_ENV === 'local',
      },
    },
    entitlements: { 'com.apple.developer.associated-domains': ['applinks:uitpas.be'] },
  },
  android: {
    package: process.env.EXPO_PUBLIC_APP_PACKAGE_NAME,
    allowBackup: false,
    adaptiveIcon: {
      foregroundImage: process.env.EXPO_PUBLIC_APP_ADAPTIVE_ICON,
      backgroundColor: process.env.EXPO_PUBLIC_APP_ADAPTIVE_ICON_BACKGROUND_COLOR,
    },
    edgeToEdgeEnabled: true,
    predictiveBackGestureEnabled: false,
    permissions: [
      'android.permission.CAMERA',
      'android.permission.READ_EXTERNAL_STORAGE',
      'android.permission.WRITE_EXTERNAL_STORAGE',
    ],
  },
  plugins: [
    'expo-localization',

    ['expo-build-properties', { ios: { useFrameworks: 'static' }, android: { minSdkVersion: 29, cppVersion: '20' } }],
    [
      'react-native-vision-camera',
      { cameraPermissionText: 'UiTPAS needs access to your Camera to scan QR codes.', enableCodeScanner: true },
    ],
    [
      'expo-font',
      {
        fonts: [
          './src/_assets/fonts/Poppins-Bold.ttf',
          './src/_assets/fonts/Poppins-Light.ttf',
          './src/_assets/fonts/Poppins-Regular.ttf',
          './src/_assets/fonts/Poppins-SemiBold.ttf',
        ],
      },
    ],
    ['react-native-auth0', { domain: process.env.EXPO_PUBLIC_AUTH_DOMAIN }],
  ],
  extra: {
    // Map commonly used env vars to extras so `expo-constants` can provide them
    API_HOST: process.env.EXPO_PUBLIC_API_HOST ?? process.env.API_HOST,
    API_HOST_UITDATABANK: process.env.EXPO_PUBLIC_API_HOST_UITDATABANK ?? process.env.API_HOST_UITDATABANK,
    APP_NAME: process.env.EXPO_PUBLIC_APP_NAME ?? process.env.APP_NAME,
    NODE_ENV: process.env.EXPO_PUBLIC_NODE_ENV ?? process.env.NODE_ENV,
    REACT_NATIVE_APP_AUTH0_CLIENT_ID: process.env.EXPO_PUBLIC_AUTH_CLIENT_ID ?? process.env.REACT_NATIVE_APP_AUTH0_CLIENT_ID,
    REACT_NATIVE_APP_AUTH0_DOMAIN: process.env.EXPO_PUBLIC_AUTH_DOMAIN ?? process.env.REACT_NATIVE_APP_AUTH0_DOMAIN,
    REACT_NATIVE_APP_AUTH0_AUDIENCE: process.env.EXPO_PUBLIC_AUTH_AUDIENCE ?? process.env.REACT_NATIVE_APP_AUTH0_AUDIENCE,
    REACT_NATIVE_APP_ENCRYPTION_KEY: process.env.EXPO_PUBLIC_APP_ENCRYPTION_KEY ?? process.env.REACT_NATIVE_APP_ENCRYPTION_KEY,
    REACT_NATIVE_APP_VERSION_NR: process.env.EXPO_PUBLIC_APP_VERSION ?? process.env.REACT_NATIVE_APP_VERSION_NR,
    REACT_NATIVE_APP_LOGGING_LEVEL: process.env.EXPO_PUBLIC_APP_LOGGING_LEVEL ?? process.env.REACT_NATIVE_APP_LOGGING_LEVEL,
    SENTRY_DSN: process.env.EXPO_PUBLIC_SENTRY_DSN ?? process.env.SENTRY_DSN,
    TRACKING_HOST: process.env.EXPO_PUBLIC_TRACKING_HOST ?? process.env.TRACKING_HOST,
  },
});
