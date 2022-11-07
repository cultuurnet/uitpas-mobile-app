import React, { useEffect } from 'react';
import { useAuth0 } from 'react-native-auth0';
import SplashScreen from 'react-native-splash-screen';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { StorageKey } from '../../_models';
import { useGetAsyncStorageValue } from '../../_queries/useGetAsyncStorageValue';
import Home from '../../login/Login';
import Onboarding from '../../onboarding/Onboarding';
import { MainNavigator } from './MainNavigator';

export type TRootParams = {
  Home: undefined;
  MainNavigator: undefined;
  Onboarding: undefined;
};

const RootStack = createNativeStackNavigator<TRootParams>();

export const RootStackNavigator = () => {
  const { data: isPolicyApproved = false, isLoading } = useGetAsyncStorageValue<boolean>(StorageKey.IsPolicyApproved);
  const { user } = useAuth0();
  const isAuthenticated = user !== undefined && user !== null;

  useEffect(() => {
    !isLoading && SplashScreen.hide();
  }, [isLoading]);

  return (
    <RootStack.Navigator screenOptions={{ headerShown: false }}>
      {!isPolicyApproved && !isLoading && <RootStack.Screen component={Onboarding} name="Onboarding" />}
      {!isAuthenticated && <RootStack.Screen component={Home} name="Home" />}
      {isAuthenticated && <RootStack.Screen component={MainNavigator} name="MainNavigator" />}
    </RootStack.Navigator>
  );
};
