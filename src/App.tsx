import React, { useEffect } from 'react';
import { LogBox, StatusBar } from 'react-native';
import { Config } from 'react-native-config';
import { getLocales } from 'react-native-localize';
import SplashScreen from 'react-native-splash-screen';
import { useAsyncStorage } from '@react-native-async-storage/async-storage';
import { NavigationContainer } from '@react-navigation/native';
import * as Sentry from '@sentry/react-native';

import { StorageKey } from './_models';
import RootStackNavigator from './RootStackNavigator';

import './_translations/i18n';

if (!__DEV__) {
  Sentry.init({
    dsn: Config.SENTRY_DSN,
    environment: Config.NODE_ENV,
  });
}
LogBox.ignoreAllLogs();

const App = () => {
  const { setItem } = useAsyncStorage(StorageKey.Language);

  useEffect(() => {
    SplashScreen.hide();
    setItem(getLocales()[0].languageCode);
  }, []);

  return (
    <NavigationContainer>
      <StatusBar barStyle="light-content" />
      <RootStackNavigator />
    </NavigationContainer>
  );
};

export default App;
