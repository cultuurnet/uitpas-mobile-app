import React, { useEffect } from 'react';
import SplashScreen from 'react-native-splash-screen';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { useAuthentication } from '../../_context';
import { StorageKey } from '../../_models';
import { useGetAsyncStorageValue } from '../../_queries/useGetAsyncStorageValue';
import Home from '../../login/Login';
import Onboarding from '../../onboarding/Onboarding';
import { MainNavigator } from './MainNavigator';

export type TRootRoutes = 'MainNavigator' | 'Onboarding' | 'Home';
export type TRootParams = Record<TRootRoutes, undefined>;

const RootStack = createNativeStackNavigator<TRootParams>();

export const RootStackNavigator = () => {
  const { isAuthenticated, isInitialized } = useAuthentication();
  const { data: isPolicyApproved = false, isLoading } = useGetAsyncStorageValue<boolean>(StorageKey.IsPolicyApproved);

  useEffect(() => {
    if (isLoading) return;
    if (!isInitialized) return;

    SplashScreen.hide();
  }, [isLoading]);

  return (
    <RootStack.Navigator screenOptions={{ headerShown: false }}>
      {!isPolicyApproved && !isLoading && <RootStack.Screen component={Onboarding} name="Onboarding" />}
      {!isAuthenticated && <RootStack.Screen component={Home} name="Home" />}
      {isAuthenticated && <RootStack.Screen component={MainNavigator} name="MainNavigator" />}
    </RootStack.Navigator>
  );
};
