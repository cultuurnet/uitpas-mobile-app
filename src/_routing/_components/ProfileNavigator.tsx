import React, { FC } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { generalStyles } from '../../_styles/constants';
import i18n from '../../_translations/i18n';
import About from '../../about/About';
import History from '../../history/History';
import Profile from '../../profile/Profile';

export type TProfileRoutes = 'Profile' | 'About' | 'History';
export type TProfileParams = Record<TProfileRoutes, undefined>;

const Stack = createNativeStackNavigator<TProfileParams>();

export const ProfileNavigator: FC = () => {
  return (
    <Stack.Navigator
      initialRouteName="Profile"
      screenOptions={{
        headerShown: false,
        ...generalStyles.navigationHeader,
      }}
    >
      <Stack.Screen component={Profile} name="Profile" />
      <Stack.Screen
        component={About}
        name="About"
        options={{
          headerBackTitle: i18n.t('PROFILE.ABOUT.BACK_TITLE'),
          headerShown: true,
          headerTitle: i18n.t('PROFILE.ABOUT.HEADER_TITLE'),
        }}
      />
      <Stack.Screen
        component={History}
        name="History"
        options={{
          headerBackTitle: i18n.t('PROFILE.HISTORY.BACK_TITLE'),
          headerShown: true,
          headerTitle: i18n.t('PROFILE.HISTORY.HEADER_TITLE'),
        }}
      />
    </Stack.Navigator>
  );
};
