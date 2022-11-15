import React, { useEffect } from 'react';
import { LogBox, StatusBar } from 'react-native';
import { getLocales } from 'react-native-localize';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import { ThemeProvider } from 'styled-components/native';

import { AuthenticationProvider } from './_context';
import { StorageKey } from './_models';
import { QueryClientProvider } from './_providers';
import RootStackNavigator from './_routing';
import { theme } from './_styles/theme';
import { storage } from './storage';

import './_translations/i18n';

LogBox.ignoreAllLogs();

const App = () => {
  useEffect(() => {
    storage.set(StorageKey.Language, getLocales()[0].languageCode);
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <AuthenticationProvider>
        <QueryClientProvider>
          <SafeAreaProvider>
            <NavigationContainer>
              <StatusBar barStyle="light-content" />
              <RootStackNavigator />
            </NavigationContainer>
          </SafeAreaProvider>
        </QueryClientProvider>
      </AuthenticationProvider>
    </ThemeProvider>
  );
};

export default App;
