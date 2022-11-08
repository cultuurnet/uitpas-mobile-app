import React, { FC } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Login from '../../login/Login';

export type TUnauthorizedRoutes = 'Home';
export type TUnauthorizedParams = Record<TUnauthorizedRoutes, undefined>;

const Stack = createNativeStackNavigator<TUnauthorizedParams>();

export const UnauthorizedNavigator: FC = () => {
  return (
    <Stack.Navigator initialRouteName="Home" screenOptions={{ headerShown: false }}>
      <Stack.Screen component={Login} name="Home" />
    </Stack.Navigator>
  );
};
