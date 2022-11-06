import React, { useEffect } from 'react';
import { LogBox, StatusBar } from 'react-native';
import { getLocales } from 'react-native-localize';
import { useAsyncStorage } from '@react-native-async-storage/async-storage';
import { NavigationContainer } from '@react-navigation/native';

import { StorageKey } from './_models';
import RootStackNavigator from './_routing';
import AppProviders from './AppProviders';

import './_translations/i18n';

LogBox.ignoreAllLogs();

const App = () => {
  const { setItem } = useAsyncStorage(StorageKey.Language);

  useEffect(() => {
    setItem(getLocales()[0].languageCode);
  }, []);

  return (
    <AppProviders>
      <NavigationContainer>
        <StatusBar barStyle="dark-content" />
        <RootStackNavigator />
      </NavigationContainer>
    </AppProviders>
  );
};

export default App;
