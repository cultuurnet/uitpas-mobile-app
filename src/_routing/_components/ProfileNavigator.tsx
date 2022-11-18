import React, { FC } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { theme } from '../../_styles/theme';
import History from '../../history/History';
import Profile from '../../profile/Profile';

export type TProfileParams = {
  History: undefined;
  Profiel: undefined;
};

const Stack = createNativeStackNavigator<TProfileParams>();

export const ProfileNavigator: FC = () => {
  return (
    <Stack.Navigator initialRouteName="Profiel" screenOptions={{ headerShown: false }}>
      <Stack.Screen component={Profile} name="Profiel" />
      <Stack.Screen
        component={History}
        name="History"
        options={{
          headerBackTitle: 'Profiel',
          headerShown: true,
          headerStyle: { backgroundColor: theme.colors.primary },
          headerTintColor: theme.colors.white,
        }}
      />
    </Stack.Navigator>
  );
};
