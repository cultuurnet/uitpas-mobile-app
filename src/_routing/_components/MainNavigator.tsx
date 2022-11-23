import React, { FC } from 'react';
import { Platform } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { t } from 'i18next';

import TabBarIcon from '../../_components/tabBarIcon/TabBarIcon';
import { theme } from '../../_styles/theme';
import Scan from '../../scan/Scan';
import Shop from '../../shop/Shop';
import { ProfileNavigator } from './ProfileNavigator';
import { mapRouteNameToIcon } from './utils';

export type TMainRoutes = 'ProfileNavigator' | 'Scan' | 'Shop';
export type TMainParams = Record<TMainRoutes, undefined>;

export const MainNavigator: FC = () => {
  const Tab = createBottomTabNavigator<TMainParams>();
  const insets = useSafeAreaInsets();

  return (
    <Tab.Navigator
      backBehavior="history"
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: theme.colors.primary,
        tabBarIcon: ({ focused }) => {
          return <TabBarIcon focused={focused} name={mapRouteNameToIcon(route.name)} />;
        },
        tabBarItemStyle: {
          height: 40,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          marginTop: 3,
        },
        tabBarStyle: {
          height: 60 + insets.bottom,
          padding: 10,
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
        component={Scan}
        name="Scan"
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
