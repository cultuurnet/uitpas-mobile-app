import React, { useEffect } from 'react';
import { LogBox, StatusBar } from 'react-native';
import { getLocales } from 'react-native-localize';
import SplashScreen from 'react-native-splash-screen';
import { useAsyncStorage } from '@react-native-async-storage/async-storage';
import { NavigationContainer } from '@react-navigation/native';
import { ThemeProvider } from 'styled-components/native';

import { StorageKey } from './_models';
import { theme } from './_styles/theme';
import RootStackNavigator from './RootStackNavigator';

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
      <NavigationContainer>
        <StatusBar barStyle="light-content" />
        <RootStackNavigator />
      </NavigationContainer>
    </ThemeProvider>
  );
};

export default App;
