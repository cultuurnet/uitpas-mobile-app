import { ExpoConfig, ConfigContext } from 'expo/config';

export default ({ config }: ConfigContext): ExpoConfig => ({
  ...config,
  name: process.env.EXPO_PUBLIC_APP_NAME,
  slug: 'uitpas-mobile-app',
  version: process.env.EXPO_PUBLIC_APP_VERSION,
  orientation: 'portrait',
  icon: process.env.EXPO_PUBLIC_APP_ICON,
  userInterfaceStyle: 'light',
  scheme: process.env.EXPO_PUBLIC_APP_PACKAGE_NAME,
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
    [
      'expo-splash-screen',
      {
        backgroundColor: '#FFFFFF',
        image: './src/_assets/splash.png',
        imageWidth: 250,
        resizeMode: 'contain',
      },
    ],
    ['expo-navigation-bar', { backgroundColor: '#FFFFFF', barStyle: 'dark' }],
  ],
  extra: {
    API_HOST: process.env.EXPO_PUBLIC_API_HOST,
    API_HOST_UITDATABANK: process.env.EXPO_PUBLIC_API_HOST_UITDATABANK,
    APP_NAME: process.env.EXPO_PUBLIC_APP_NAME,
    APP_PACKAGE_NAME: process.env.EXPO_PUBLIC_APP_PACKAGE_NAME,
    NODE_ENV: process.env.EXPO_PUBLIC_NODE_ENV,
    REACT_NATIVE_APP_AUTH_CLIENT_ID: process.env.EXPO_PUBLIC_AUTH_CLIENT_ID,
    REACT_NATIVE_APP_AUTH_ISSUER: process.env.EXPO_PUBLIC_AUTH_ISSUER,
    REACT_NATIVE_APP_ENCRYPTION_KEY: process.env.EXPO_PUBLIC_APP_ENCRYPTION_KEY,
    REACT_NATIVE_APP_VERSION_NR: process.env.EXPO_PUBLIC_APP_VERSION,
    REACT_NATIVE_APP_LOGGING_LEVEL: process.env.EXPO_PUBLIC_APP_LOGGING_LEVEL,
    SENTRY_DSN: process.env.EXPO_PUBLIC_SENTRY_DSN,
    TRACKING_HOST: process.env.EXPO_PUBLIC_TRACKING_HOST,
  },
});
