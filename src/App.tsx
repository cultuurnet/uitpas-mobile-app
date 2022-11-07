import React, { useEffect } from 'react';
import { LogBox, StatusBar } from 'react-native';
import { getLocales } from 'react-native-localize';
import SplashScreen from 'react-native-splash-screen';
import { useAsyncStorage } from '@react-native-async-storage/async-storage';
import { NavigationContainer } from '@react-navigation/native';
import { ThemeProvider } from 'styled-components/native';

import { StorageKey } from './_models';
import { AuthenticationProvider, QueryClientProvider } from './_providers';
import RootStackNavigator from './_routing';
import { theme } from './_styles/theme';

import './_translations/i18n';

LogBox.ignoreAllLogs();

const App = () => {
  const { setItem } = useAsyncStorage(StorageKey.Language);

  useEffect(() => {
    SplashScreen.hide();
    setItem(getLocales()[0].languageCode);
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <AuthenticationProvider>
        <QueryClientProvider>
          <NavigationContainer>
            <StatusBar barStyle="light-content" />
            <RootStackNavigator />
          </NavigationContainer>
        </QueryClientProvider>
      </AuthenticationProvider>
    </ThemeProvider>
  );
};

export default App;
