import React, { FC } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Home from '../../home/Home';

export type TAuthenticationParams = {
  Home: undefined;
};

const Stack = createNativeStackNavigator<TAuthenticationParams>();

export const AuthenticationNavigator: FC = () => {
  return (
    <Stack.Navigator initialRouteName="Home" screenOptions={{ headerShown: false }}>
      <Stack.Screen component={Home} name="Home" />
    </Stack.Navigator>
  );
};
