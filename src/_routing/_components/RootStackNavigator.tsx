import React, { useEffect } from 'react';
import SplashScreen from 'react-native-splash-screen';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { useAuthentication } from '../../_context/AuthenticationProvider';
import { MainNavigator } from './MainNavigator';
import { UnauthorizedNavigator } from './UnauthorizedNavigator';

export type TRootRoutes = 'MainNavigator' | 'UnauthorizedNavigator';
export type TRootParams = Record<TRootRoutes, undefined>;

const RootStack = createNativeStackNavigator<TRootParams>();

export const RootStackNavigator = () => {
  const { isAuthenticated, isInitialized } = useAuthentication();

  useEffect(() => {
    if (!isInitialized) return;

    SplashScreen.hide();
  }, [isInitialized]);

  return (
    <RootStack.Navigator screenOptions={{ headerShown: false }}>
      {!isAuthenticated && <RootStack.Screen component={UnauthorizedNavigator} name="UnauthorizedNavigator" />}
      {isAuthenticated && <RootStack.Screen component={MainNavigator} name="MainNavigator" />}
    </RootStack.Navigator>
  );
};
