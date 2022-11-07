import React from 'react';
import { useAuth0 } from 'react-native-auth0';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { MainNavigator } from './MainNavigator';
import { UnauthorizedNavigator } from './UnauthorizedNavigator';

export type TRootRoutes = 'MainNavigator' | 'UnauthorizedNavigator';
export type TRootParams = Record<TRootRoutes, undefined>;

const RootStack = createNativeStackNavigator<TRootParams>();

export const RootStackNavigator = () => {
  const { user } = useAuth0();
  const isAuthenticated = !!user;

  return (
    <RootStack.Navigator screenOptions={{ headerShown: false }}>
      {!isAuthenticated && <RootStack.Screen component={UnauthorizedNavigator} name="UnauthorizedNavigator" />}
      {isAuthenticated && <RootStack.Screen component={MainNavigator} name="MainNavigator" />}
    </RootStack.Navigator>
  );
};
