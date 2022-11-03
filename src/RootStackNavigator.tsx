import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { MainNavigator } from './_routing/_components';
import { TRootStackParamList } from './_routing/_models';

const RootStack = createNativeStackNavigator<TRootStackParamList>();

const RootStackNavigator = () => {
  return (
    <RootStack.Navigator>
      <RootStack.Screen component={MainNavigator} name="MainNavigator" options={{ headerShown: false }} />
    </RootStack.Navigator>
  );
};

export default RootStackNavigator;
