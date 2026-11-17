import { ConfigContext, ExpoConfig } from 'expo/config';

// Jenkins sets BUILD_NUMBER for CI/release builds; local builds don't have it.
const isCiBuild = process.env.BUILD_NUMBER != null;
// Without this, iOS App Transport Security blocks the app from reaching Metro (localhost / LAN IP)
// and Debug builds fail with "No script URL provided".
const allowsLocalNetworking = !isCiBuild || process.env.EXPO_PUBLIC_NODE_ENV === 'local';

export default ({ config }: ConfigContext): ExpoConfig => ({
  ...config,
  android: {
    adaptiveIcon: {
      backgroundColor: process.env.EXPO_PUBLIC_APP_ADAPTIVE_ICON_BACKGROUND_COLOR,
      foregroundImage: process.env.EXPO_PUBLIC_APP_ADAPTIVE_ICON,
    },
    allowBackup: false,
    package: process.env.EXPO_PUBLIC_APP_PACKAGE_NAME,
    permissions: [
      'android.permission.CAMERA',
      'android.permission.READ_EXTERNAL_STORAGE',
      'android.permission.WRITE_EXTERNAL_STORAGE',
    ],
    predictiveBackGestureEnabled: false,
    versionCode: process.env.BUILD_NUMBER != null ? Math.max(108, 107 + parseInt(process.env.BUILD_NUMBER, 10)) : undefined,
  },
  extra: {
    API_HOST: process.env.EXPO_PUBLIC_API_HOST,
    API_HOST_UITDATABANK: process.env.EXPO_PUBLIC_API_HOST_UITDATABANK,
    APP_NAME: process.env.EXPO_PUBLIC_APP_NAME,
    APP_PACKAGE_NAME: process.env.EXPO_PUBLIC_APP_PACKAGE_NAME,
    NODE_ENV: process.env.EXPO_PUBLIC_NODE_ENV,
    REACT_NATIVE_APP_AUTH_CLIENT_ID: process.env.EXPO_PUBLIC_AUTH_CLIENT_ID,
    REACT_NATIVE_APP_AUTH_ISSUER: process.env.EXPO_PUBLIC_AUTH_ISSUER,
    REACT_NATIVE_APP_ENCRYPTION_KEY: process.env.EXPO_PUBLIC_APP_ENCRYPTION_KEY,
    REACT_NATIVE_APP_LOGGING_LEVEL: process.env.EXPO_PUBLIC_APP_LOGGING_LEVEL,
    REACT_NATIVE_APP_VERSION_NR: process.env.EXPO_PUBLIC_APP_VERSION,
    SENTRY_DSN: process.env.EXPO_PUBLIC_SENTRY_DSN,
    TRACKING_HOST: process.env.EXPO_PUBLIC_TRACKING_HOST,
  },
  icon: process.env.EXPO_PUBLIC_APP_ICON,
  ios: {
    bundleIdentifier: process.env.EXPO_PUBLIC_APP_PACKAGE_NAME,
    deploymentTarget: '16.4',
    entitlements: { 'com.apple.developer.associated-domains': ['applinks:uitpas.be'] },
    infoPlist: {
      NSAppTransportSecurity: {
        NSAllowsArbitraryLoads: false,
        NSAllowsLocalNetworking: allowsLocalNetworking,
      },
      NSCameraUsageDescription: 'UiTPAS needs camera access to scan QR codes',
      NSPhotoLibraryAddUsageDescription: 'UiTPAS needs permission to save photos',
      NSPhotoLibraryUsageDescription: 'UiTPAS needs access to your photo library',
    },
    supportsTablet: false,
  },
  name: process.env.EXPO_PUBLIC_APP_NAME,
  orientation: 'portrait',
  plugins: [
    'expo-localization',
    [
      'expo-build-properties',
      {
        android: { enableMinifyInReleaseBuilds: false, minSdkVersion: 29 },
        ios: { useFrameworks: 'static' },
      },
    ],
    '@react-native-community/datetimepicker',
    [
      '@sentry/react-native/expo',
      {
        organization: 'publiq-vzw',
        project: 'uitpas-mobile-app',
        url: 'https://sentry.io/',
      },
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
        resizeMode: 'contain',
      },
    ],
    ['expo-navigation-bar', { backgroundColor: '#FFFFFF', style: 'dark' }],
    'expo-web-browser',
    // ML Kit 9.0.0 excludes arm64 from simulator builds, but Xcode 26+ simulators
    // are arm64-only. This plugin removes the exclusion and relabels the vendored
    // arm64 ML Kit slices for Apple Silicon simulators.
    './plugins/withMlkitSimulatorSupport',
  ],
  scheme: process.env.EXPO_PUBLIC_APP_PACKAGE_NAME,
  slug: 'uitpas-mobile-app',
  userInterfaceStyle: 'light',
  version: process.env.EXPO_PUBLIC_APP_VERSION,
});
