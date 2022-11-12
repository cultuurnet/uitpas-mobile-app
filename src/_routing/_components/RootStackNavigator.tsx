import React, { useEffect, useMemo, useState } from 'react';
import SplashScreen from 'react-native-splash-screen';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { useAuthentication } from '../../_context';
import { StorageKey } from '../../_models';
import Home from '../../login/Login';
import Onboarding from '../../onboarding/Onboarding';
import { storage } from '../../storage';
import { MainNavigator } from './MainNavigator';

export type TRootRoutes = 'MainNavigator' | 'Onboarding' | 'Home';
export type TRootParams = Record<TRootRoutes, undefined>;

const RootStack = createNativeStackNavigator<TRootParams>();

export const RootStackNavigator = () => {
  const { isAuthenticated, isInitialized } = useAuthentication();
  const isPolicyApprovedInStorage = useMemo(() => storage.getBoolean(StorageKey.IsPolicyApproved), []);
  const [hasViewedOnboarding, setHasViewedOnboarding] = useState(false);

  useEffect(() => {
    if (!isInitialized) return;
    SplashScreen.hide();
  }, [isInitialized]);

  return (
    <RootStack.Navigator screenOptions={{ headerShown: false }}>
      {!isPolicyApprovedInStorage && !hasViewedOnboarding && !isAuthenticated && (
        <RootStack.Screen
          component={Onboarding}
          listeners={() => ({
            focus: () => setHasViewedOnboarding(true),
          })}
          name="Onboarding"
        />
      )}
      {!isAuthenticated && <RootStack.Screen component={Home} name="Home" />}
      {isAuthenticated && <RootStack.Screen component={MainNavigator} name="MainNavigator" />}
    </RootStack.Navigator>
  );
};
