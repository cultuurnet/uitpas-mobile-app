import React, { useEffect } from 'react';
import { LogBox, StatusBar } from 'react-native';
import { getLocales } from 'react-native-localize';
import SplashScreen from 'react-native-splash-screen';
import { useAsyncStorage } from '@react-native-async-storage/async-storage';
import { NavigationContainer } from '@react-navigation/native';
import { ThemeProvider } from 'styled-components/native';

import { StorageKey } from './_models';
import RootStackNavigator from './_routing';
import { QueryClientProvider } from './_providers';
import { theme } from './_styles/theme';

import './_translations/i18n';
import { useGetAsyncStorageValue } from './_queries/useGetAsyncStorageValue';

LogBox.ignoreAllLogs();

const App = () => {
  const { setItem } = useAsyncStorage(StorageKey.Language);

  useEffect(() => {
    setItem(getLocales()[0].languageCode);
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <QueryClientProvider>
        <NavigationContainer>
          <StatusBar barStyle="dark-content" />
          <RootStackNavigator />
        </NavigationContainer>
      </QueryClientProvider>
    </ThemeProvider>
  );
};

export default App;
