import React, { useEffect, useMemo, useState } from 'react';
import SplashScreen from 'react-native-splash-screen';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { useAuthentication } from '../../_context';
import { StorageKey } from '../../_models';
import Login from '../../login/Login';
import Onboarding from '../../onboarding/Onboarding';
import ProfileNotFound from '../../profile/ProfileNotFound';
import { TCheckInResponse } from '../../scan/_models';
import ScanError from '../../scan/ScanError';
import ScanSuccess from '../../scan/ScanSuccess';
import { storage } from '../../storage';
import { MainNavigator } from './MainNavigator';

export type TRootRoutes = 'MainNavigator' | 'Onboarding' | 'Login' | 'ProfileNotFound' | 'ScanSuccess' | 'ScanError';
export type TRootParams = Record<Exclude<TRootRoutes, 'ScanSuccess' | 'ScanError'>, undefined> & {
  ScanError: {
    error: string;
  };
  ScanSuccess: TCheckInResponse;
};

const RootStack = createNativeStackNavigator<TRootParams>();

export const RootStackNavigator = () => {
  const { isAuthenticated, isInitialized } = useAuthentication();
  const isPolicyApprovedInStorage = useMemo(() => storage.getBoolean(StorageKey.IsPolicyApproved), []);
  const [hasViewedOnboarding, setHasViewedOnboarding] = useState(false);

  useEffect(() => {
    if (isInitialized) SplashScreen.hide();
  }, [isInitialized]);

  return (
    <RootStack.Navigator screenOptions={{ headerShown: false }}>
      {!isPolicyApprovedInStorage && !hasViewedOnboarding && !isAuthenticated && (
        <RootStack.Screen
          component={Onboarding}
          listeners={() => ({
            focus: () => {
              if (isInitialized) setHasViewedOnboarding(true);
            },
          })}
          name="Onboarding"
        />
      )}
      {!isAuthenticated && <RootStack.Screen component={Login} name="Login" />}
      {isAuthenticated && (
        <>
          <RootStack.Screen component={MainNavigator} name="MainNavigator" />
          <RootStack.Screen component={ProfileNotFound} name="ProfileNotFound" options={{ gestureEnabled: false }} />
          <RootStack.Screen component={ScanSuccess} name="ScanSuccess" />
          <RootStack.Screen component={ScanError} name="ScanError" />
        </>
      )}
    </RootStack.Navigator>
  );
};
