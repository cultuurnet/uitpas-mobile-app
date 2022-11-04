import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { MainNavigator } from './MainNavigator';
import { UnauthorizedNavigator } from './UnauthorizedNavigator';

export type TRootRoutes = 'MainNavigator' | 'UnauthorizedNavigator';
export type TRootParams = Record<TRootRoutes, undefined>;

const RootStack = createNativeStackNavigator<TRootParams>();

export const RootStackNavigator = () => {
  return (
    <RootStack.Navigator screenOptions={{ headerShown: false }}>
      <RootStack.Screen component={UnauthorizedNavigator} name="UnauthorizedNavigator" />
      <RootStack.Screen component={MainNavigator} name="MainNavigator" />
    </RootStack.Navigator>
  );
};