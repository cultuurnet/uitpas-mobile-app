import React, { FC } from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { t } from 'i18next';

import { NavigationBar, NavigationButton } from '../../_components';
import TabBarIcon from '../../_components/tabBarIcon/TabBarIcon';
import { theme } from '../../_styles/theme';
import Camera from '../../scan/camera/Camera';
import Shop from '../../shop/Shop';
import { ProfileNavigator } from './ProfileNavigator';

export type TMainRoutes = 'ProfileNavigator' | 'Camera' | 'Shop';
export type TMainParams = Record<TMainRoutes, undefined>;

export const MainNavigator: FC = () => {
  const Tab = createBottomTabNavigator<TMainParams>();
  const insets = useSafeAreaInsets();

  return (
    <Tab.Navigator
      backBehavior="history"
      screenOptions={() => ({
        headerShown: false,
        tabBarActiveTintColor: theme.palette.secondary['500'],
        tabBarBackground: () => <NavigationBar />,
        tabBarInactiveTintColor: theme.palette.neutral['500'],
        tabBarItemStyle: {
          height: 40,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          marginTop: 3,
        },
        tabBarStyle: {
          backgroundColor: 'transparent',
          borderTopWidth: 0,
          elevation: 0,
          height: 60 + insets.bottom,
          padding: 10,
          position: 'absolute',
          shadowOpacity: 0,
        },
      })}
    >
      <Tab.Screen
        component={ProfileNavigator}
        name="ProfileNavigator"
        options={{
          tabBarIcon: ({ size: _, ...props }) => <TabBarIcon name="Profile" {...props} />,
          tabBarItemStyle: {
            height: 40,
            marginRight: 37.5,
          },
          title: t('NAVIGATION.PROFILE'),
        }}
      />
      <Tab.Screen
        component={Camera}
        name="Camera"
        options={({ navigation }) => {
          const focused = navigation.isFocused();

          return {
            tabBarButton: props => <NavigationButton focused={focused} {...props} />,
            tabBarIcon: ({ size: _, ...props }) => <TabBarIcon name="QR" size={24} {...props} />,
            tabBarLabelStyle: {
              color: focused ? theme.palette.neutral['0'] : theme.palette.neutral['500'],
            },
            title: t('NAVIGATION.CAMERA'),
          };
        }}
      />
      <Tab.Screen
        component={Shop}
        name="Shop"
        options={{
          tabBarIcon: ({ size: _, ...props }) => <TabBarIcon name="Shop" {...props} />,
          tabBarItemStyle: {
            height: 40,
            marginLeft: 37.5,
          },
          title: t('NAVIGATION.SHOP'),
        }}
      />
    </Tab.Navigator>
  );
};
