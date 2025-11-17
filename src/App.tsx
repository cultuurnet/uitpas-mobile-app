import React, { useEffect } from 'react';
import { LogBox } from 'react-native';
import { getLocales } from 'react-native-localize';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer, useNavigationContainerRef } from '@react-navigation/native';
import { ThemeProvider } from 'styled-components/native';
import { StatusBar } from 'expo-status-bar';

import { AuthenticationProvider, OnboardingProvider, QueryClientProvider, TrackingProvider } from './_context';
import { StorageKey } from './_models';
import RootStackNavigator from './_routing';
import { theme } from './_styles/theme';
import { setupPolyfills } from './_utils/polyfillHelpers';
import { storage } from './storage';

import 'react-native-reanimated';
import './_translations/i18n';

setupPolyfills();
LogBox.ignoreAllLogs();

const App = () => {
  const navigationRef = useNavigationContainerRef();

  useEffect(() => {
    storage.set(StorageKey.Language, getLocales()[0].languageCode);
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <AuthenticationProvider>
        <OnboardingProvider>
          <QueryClientProvider>
            <SafeAreaProvider>
              <NavigationContainer ref={navigationRef}>
                <TrackingProvider>
                  <StatusBar backgroundColor={theme.palette.secondary[600]} style="light" />
                  <RootStackNavigator />
                </TrackingProvider>
              </NavigationContainer>
            </SafeAreaProvider>
          </QueryClientProvider>
        </OnboardingProvider>
      </AuthenticationProvider>
    </ThemeProvider>
  );
};

export default App;
