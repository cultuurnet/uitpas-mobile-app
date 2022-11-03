import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { MainNavigator } from './MainNavigator';
import Onboarding from '../../onboarding/Onboarding';
import { useGetAsyncStorageValue } from '../../_queries/useGetAsyncStorageValue';
import { StorageKey } from '../../_models';
import Home from '../../home/Home';

export type TRootParams = {
  MainNavigator: undefined;
  Onboarding: undefined;
  Home: undefined;
};

const RootStack = createNativeStackNavigator<TRootParams>();

export const RootStackNavigator = () => {
  const { data: isPolicyApproved } = useGetAsyncStorageValue<boolean>(StorageKey.IsPolicyApproved);

  return (
    <RootStack.Navigator screenOptions={{ headerShown: false }}>
      {!isPolicyApproved && <RootStack.Screen component={Onboarding} name="Onboarding" />}
      <RootStack.Screen component={Home} name="Home" />
      <RootStack.Screen component={MainNavigator} name="MainNavigator" />
    </RootStack.Navigator>
  );
};
