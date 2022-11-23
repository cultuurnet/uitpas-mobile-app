import React, { FC } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Camera from '../../scan/camera/Camera';

export type TScanRoutes = 'Camera';
export type TScanParams = Record<TScanRoutes, undefined>;

const Stack = createNativeStackNavigator<TScanParams>();

export const ScanNavigator: FC = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen component={Camera} name="Camera" />
    </Stack.Navigator>
  );
};
