import React, { useEffect, useMemo, useState } from 'react';
import { Config } from 'react-native-config';
import SplashScreen from 'react-native-lottie-splash-screen';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { useAuthentication } from '../../_context';
import { StorageKey } from '../../_models';
import Login from '../../login/Login';
import Onboarding from '../../onboarding/Onboarding';
import ProfileNotFound from '../../profile/ProfileNotFound';
import { storage } from '../../storage';
import { useGetVersions } from '../../update/_queries/useGetVersions';
import UpdateScreen from '../../update/UpdateScreen';
import { MainNavigator } from './MainNavigator';

export type TRootRoutes = 'MainNavigator' | 'Onboarding' | 'Login' | 'ProfileNotFound' | 'Update';
export type TRootParams = Record<TRootRoutes, undefined>;

const RootStack = createNativeStackNavigator<TRootParams>();

export const RootStackNavigator = () => {
  const { isAuthenticated, isInitialized } = useAuthentication();
  const versions = useGetVersions();
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
      {Config.UPDATE_CHECK_ENABLED === 'true' && isAuthenticated && versions?.isBehindMinVersion && (
        <RootStack.Screen component={UpdateScreen} name="Update" />
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
