import React, { useEffect } from 'react';
import { LogBox, StatusBar } from 'react-native';
import { getLocales } from 'react-native-localize';
import SplashScreen from 'react-native-splash-screen';
import { useAsyncStorage } from '@react-native-async-storage/async-storage';
import { NavigationContainer } from '@react-navigation/native';

import { StorageKey } from './_models';
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
    <NavigationContainer>
      <StatusBar barStyle="light-content" />
      <RootStackNavigator />
    </NavigationContainer>
  );
};

export default App;
