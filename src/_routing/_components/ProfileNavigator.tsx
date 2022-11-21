import React, { FC } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { theme } from '../../_styles/theme';
import i18n from '../../_translations/i18n';
import About from '../../about/About';
import Profile from '../../profile/Profile';

export type TProfileRoutes = 'Profile' | 'About';
export type TProfileParams = Record<TProfileRoutes, undefined>;

const Stack = createNativeStackNavigator<TProfileParams>();

export const ProfileNavigator: FC = () => {
  return (
    <Stack.Navigator initialRouteName="Profile" screenOptions={{ headerShown: false }}>
      <Stack.Screen component={Profile} name="Profile" />
      <Stack.Screen
        component={About}
        name="About"
        options={{
          headerBackTitle: i18n.t('PROFILE.ABOUT.BACK_TITLE'),
          headerBackTitleStyle: { fontFamily: 'Poppins-SemiBold' },
          headerShown: true,
          headerStyle: { backgroundColor: theme.colors.primary },
          headerTintColor: theme.colors.white,
          headerTitle: i18n.t('PROFILE.ABOUT.HEADER_TITLE'),
          headerTitleStyle: { fontFamily: 'Poppins-SemiBold' },
        }}
      />
    </Stack.Navigator>
  );
};
