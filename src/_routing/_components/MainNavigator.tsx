import React, { FC, useCallback } from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { BottomTabNavigationOptions, createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { getFocusedRouteNameFromRoute, RouteProp } from '@react-navigation/native';
import { NativeStackNavigationOptions } from '@react-navigation/native-stack';
import { t } from 'i18next';

import { NavigationBar, NavigationButton } from '../../_components';
import TabBarIcon from '../../_components/tabBarIcon/TabBarIcon';
import UserPoints from '../../_components/userPoints/UserPoints';
import { theme } from '../../_styles/theme';
import { useGetMe } from '../../profile/_queries/useGetMe';
import Profile from '../../profile/Profile';
import Camera from '../../scan/camera/Camera';
import Shop from '../../shop/Shop';
import { TMainParamsList, TRootStackParamList } from './TRootStackParamList';

export const useMainHeaderProps = (enabled?: boolean): ((route: RouteProp<TRootStackParamList, "MainNavigator">) => NativeStackNavigationOptions) => {
  const { data: passHolder } = useGetMe(enabled);

  return route => {
    const routeName = getFocusedRouteNameFromRoute(route) ?? 'Shop';

    switch (routeName) {
      case 'Shop':
        return {
          headerRight: UserPoints,
          title: t('NAVIGATION.SHOP'),
        };
      case 'Camera':
        // To prevent "jumping" of the screen, we show the header, but make him transparent and so invisible
        return {
          headerStyle: {
            backgroundColor: 'transparent',
          },
          headerTransparent: true,
          title: ''
        };
      case 'Profile':
        return {
          headerTitleAlign: 'left',
          headerTitleStyle: {
            fontFamily: 'Poppins-SemiBold',
            fontSize: 20
          },
          title: t('PROFILE.HELLO', { name: passHolder?.firstName }),
        };
      default: return {};
    }
  };
}

export const MainNavigator: FC = () => {
  const Tab = createBottomTabNavigator<TMainParamsList>();
  const insets = useSafeAreaInsets();

  const screenOptions = useCallback<() => BottomTabNavigationOptions>(() => ({
    headerShown: false,
    tabBarActiveTintColor: theme.palette.secondary['500'],
    tabBarBackground: () => <NavigationBar />,
    tabBarHideOnKeyboard: true,
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
      shadowOpacity: 0.1, // only for iOS, on android, we draw a borderLine in NavigationBar.tsx
    },
  }), [insets.bottom]);

  return (
    <Tab.Navigator
      backBehavior="history"
      screenOptions={screenOptions}
    >
      <Tab.Screen
        component={Shop}
        name="Shop"
        options={{
          tabBarIcon: ({ size: _, ...props }) => <TabBarIcon name="Shop" {...props} />,
          tabBarItemStyle: {
            height: 40,
            marginRight: 37.5,
          },
          title: t('NAVIGATION.SHOP'),
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
        component={Profile}
        name="Profile"
        options={{
          tabBarIcon: ({ size: _, ...props }) => <TabBarIcon name="Profile" {...props} />,
          tabBarItemStyle: {
            height: 40,
            marginLeft: 37.5,
          },
          title: t('NAVIGATION.PROFILE'),
        }}
      />
    </ Tab.Navigator>
  );
};
