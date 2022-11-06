import React, { FC } from 'react';
import { Platform } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { t } from 'i18next';

import TabBarIcon from '../../_components/tabBarIcon/TabBarIcon';
import { theme } from '../../_styles/theme';
import Profile from '../../profile/Profile';
import Scan from '../../scan/Scan';
import Shop from '../../shop/Shop';

export type TMainRoutes = 'Profile' | 'Scan' | 'Shop';
export type TMainParams = Record<TMainRoutes, undefined>;

export const MainNavigator: FC = () => {
  const Tab = createBottomTabNavigator<TMainParams>();

  return (
    <Tab.Navigator
      backBehavior="history"
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: theme.colors.primary,
        tabBarLabelStyle: {
          fontSize: 12,
        },
        tabBarStyle: {
          ...Platform.select({ android: { paddingBottom: 4 } }),
        },
      }}
    >
      <Tab.Screen
        component={Profile}
        name="Profile"
        options={{
          tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} name="Profile" />,
          title: t('NAVIGATION.PROFILE'),
        }}
      />
      <Tab.Screen
        component={Scan}
        name="Scan"
        options={{
          tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} name="QR" />,
          title: t('NAVIGATION.SCAN'),
        }}
      />
      <Tab.Screen
        component={Shop}
        name="Shop"
        options={{
          tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} name="Shop" />,
          title: t('NAVIGATION.SHOP'),
        }}
      />
    </Tab.Navigator>
  );
};
