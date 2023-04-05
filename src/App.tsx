import React, { useEffect, useState } from 'react';
import { LogBox, StatusBar } from 'react-native';
import { getLocales } from 'react-native-localize';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { useFlipper } from '@react-navigation/devtools';
import { NavigationContainer, useNavigationContainerRef } from '@react-navigation/native';
import { ThemeProvider } from 'styled-components/native';

import { AuthenticationProvider } from './_context';
import { StorageKey } from './_models';
import { QueryClientProvider, TrackingProvider } from './_providers';
import RootStackNavigator, { TRoute } from './_routing';
import { theme } from './_styles/theme';
import { storage } from './storage';

import 'react-native-reanimated';
import './_translations/i18n';

LogBox.ignoreAllLogs();

const App = () => {
  const navigationRef = useNavigationContainerRef();
  const [currentRoute, setCurrentRoute] = useState<TRoute>();
  useFlipper(navigationRef);

  useEffect(() => {
    storage.set(StorageKey.Language, getLocales()[0].languageCode);
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <AuthenticationProvider>
        <QueryClientProvider>
          <SafeAreaProvider>
            <NavigationContainer
              onStateChange={() => setCurrentRoute(navigationRef?.getCurrentRoute().name as TRoute)}
              ref={navigationRef}
            >
              <TrackingProvider currentRoute={currentRoute}>
                <StatusBar backgroundColor={theme.palette.secondary[500]} barStyle="light-content" />
                <RootStackNavigator />
              </TrackingProvider>
            </NavigationContainer>
          </SafeAreaProvider>
        </QueryClientProvider>
      </AuthenticationProvider>
    </ThemeProvider>
  );
};

export default App;
