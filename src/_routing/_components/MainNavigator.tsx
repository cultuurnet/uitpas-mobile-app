import React, { FC } from 'react';
import { Platform } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import TabBarIcon from '../../_components/tabBarIcon/TabBarIcon';
import { theme } from '../../_styles/theme';
import Profile from '../../profile/Profile';
import Scan from '../../scan/Scan';
import Shop from '../../shop/Shop';
import { mapRouteNameToIcon } from './utils';

export type TMainRoutes = 'Profile' | 'Scan' | 'Shop';
export type TMainParams = Record<TMainRoutes, undefined>;

export const MainNavigator: FC = () => {
  const Tab = createBottomTabNavigator<TMainParams>();

  return (
    <Tab.Navigator
      backBehavior="history"
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: theme.colors.primary,
        tabBarIcon: ({ focused }) => {
          return <TabBarIcon focused={focused} name={mapRouteNameToIcon(route.name)} />;
        },
        tabBarLabelStyle: {
          fontSize: 12,
        },
        tabBarStyle: {
          ...Platform.select({ android: { paddingBottom: 4 } }),
        },
      })}
    >
      <Tab.Screen component={Profile} name="Profile" />
      <Tab.Screen component={Scan} name="Scan" />
      <Tab.Screen component={Shop} name="Shop" />
    </Tab.Navigator>
  );
};
