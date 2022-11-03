import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { AuthenticationNavigator } from './AuthenticationNavigator';
import { MainNavigator } from './MainNavigator';

export type TRootParams = {
  AuthenticationNavigator: undefined;
  MainNavigator: undefined;
};

const RootStack = createNativeStackNavigator<TRootParams>();

export const RootStackNavigator = () => {
  return (
    <RootStack.Navigator initialRouteName="MainNavigator" screenOptions={{ headerShown: false }}>
      <RootStack.Screen component={AuthenticationNavigator} name="AuthenticationNavigator" />
      <RootStack.Screen component={MainNavigator} name="MainNavigator" />
    </RootStack.Navigator>
  );
};
