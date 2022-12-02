import React, { useEffect, useMemo, useState } from 'react';
import SplashScreen from 'react-native-lottie-splash-screen';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { useAuthentication } from '../../_context';
import { StorageKey } from '../../_models';
import Login from '../../login/Login';
import Onboarding from '../../onboarding/Onboarding';
import ProfileNotFound from '../../profile/ProfileNotFound';
import { storage } from '../../storage';
import { useGetVersions } from '../../update/_queries/useGetVersions';
import { checkVersion } from '../../update/_util/checkVersion';
import { MainNavigator } from './MainNavigator';

export type TRootRoutes = 'MainNavigator' | 'Onboarding' | 'Login' | 'ProfileNotFound' | 'Update';
export type TRootParams = Record<TRootRoutes, undefined>;

const RootStack = createNativeStackNavigator<TRootParams>();

export const RootStackNavigator = () => {
  const { isAuthenticated, isInitialized } = useAuthentication();
  const { data: versions, isLoading } = useGetVersions();
  const isPolicyApprovedInStorage = useMemo(() => storage.getBoolean(StorageKey.IsPolicyApproved), []);
  const [hasViewedOnboarding, setHasViewedOnboarding] = useState(false);
  if (!isLoading) console.log('versions', checkVersion(versions));

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
        </>
      )}
    </RootStack.Navigator>
  );
};
