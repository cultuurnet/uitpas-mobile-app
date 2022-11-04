import React, { useEffect } from 'react';
import SplashScreen from 'react-native-splash-screen';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { StorageKey } from '../../_models';
import { useGetAsyncStorageValue } from '../../_queries/useGetAsyncStorageValue';
import Home from '../../home/Home';
import Onboarding from '../../onboarding/Onboarding';
import { MainNavigator } from './MainNavigator';

export type TRootParams = {
  Home: undefined;
  MainNavigator: undefined;
  Onboarding: undefined;
};

const RootStack = createNativeStackNavigator<TRootParams>();

export const RootStackNavigator = () => {
  const { data: isPolicyApproved, isLoading } = useGetAsyncStorageValue<boolean>(StorageKey.IsPolicyApproved);

  useEffect(() => {
    !isLoading && SplashScreen.hide();
  }, [isLoading]);

  return (
    <RootStack.Navigator screenOptions={{ headerShown: false }}>
      {!isPolicyApproved && !isLoading && <RootStack.Screen component={Onboarding} name="Onboarding" />}
      <RootStack.Screen component={Home} name="Home" />
      <RootStack.Screen component={MainNavigator} name="MainNavigator" />
    </RootStack.Navigator>
  );
};
