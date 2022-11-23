import React, { FC } from 'react';
import { Platform } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { t } from 'i18next';

import TabBarIcon from '../../_components/tabBarIcon/TabBarIcon';
import { theme } from '../../_styles/theme';
import Shop from '../../shop/Shop';
import { ProfileNavigator } from './ProfileNavigator';
import { ScanNavigator } from './ScanNavigator';
import { mapRouteNameToIcon } from './utils';

export type TMainRoutes = 'ProfileNavigator' | 'ScanNavigator' | 'Shop';
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
          marginTop: 3,
        },
        tabBarStyle: {
          height: 60,
          padding: 10,
          ...Platform.select({ android: { paddingBottom: 14 } }),
        },
      })}
    >
      <Tab.Screen
        component={ProfileNavigator}
        name="ProfileNavigator"
        options={{
          title: t('NAVIGATION.PROFILE'),
        }}
      />
      <Tab.Screen
        component={ScanNavigator}
        name="ScanNavigator"
        options={{
          title: t('NAVIGATION.SCAN'),
        }}
      />
      <Tab.Screen
        component={Shop}
        name="Shop"
        options={{
          title: t('NAVIGATION.SHOP'),
        }}
      />
    </Tab.Navigator>
  );
};
