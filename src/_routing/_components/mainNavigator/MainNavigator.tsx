import React, { FC } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { Icon } from '../../../_components';
import { colors } from '../../../_styles';
import Home from '../../../home/Home';
import { TMainNavigatorStackParamList } from '../../_models';
import { Text } from '../../../_components';
import Scan from '../../../scan/Scan';
import Shop from '../../../shop/Shop';
import { Platform } from 'react-native';

export const MainNavigator: FC = () => {
  const Tab = createBottomTabNavigator<TMainNavigatorStackParamList>();

  return (
    <>
      <Tab.Navigator
        backBehavior="history"
        screenOptions={{
          tabBarActiveTintColor: colors.primary,
          tabBarLabelStyle: {
            fontSize: 12,
          },
          tabBarStyle: {
            ...Platform.select({ android: { paddingBottom: 4 } }),
          },
        }}
      >
        <Tab.Screen
          component={Home}
          name="Mijn UiTPAS"
          options={{
            headerLeft: () => <Text>Dag Kris</Text>,
            headerTitle: () => null,

            tabBarIcon: ({ focused }) => (
              <Icon color={focused ? 'primary' : 'grey'} name={focused ? 'ProfileFilled' : 'Profile'} />
            ),
          }}
        />
        <Tab.Screen
          component={Scan}
          name="Sparen"
          options={{
            tabBarIcon: ({ focused }) => <Icon name={focused ? 'QRFilled' : 'QR'} />,
          }}
        />
        <Tab.Screen
          component={Shop}
          name="Shop"
          options={{
            tabBarIcon: ({ focused }) => <Icon color={focused ? 'primary' : 'grey'} name={focused ? 'ShopFilled' : 'Shop'} />,
          }}
        />
      </Tab.Navigator>
    </>
  );
};
