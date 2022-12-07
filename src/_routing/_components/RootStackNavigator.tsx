import React, { useEffect } from 'react';
import { Config } from 'react-native-config';
import SplashScreen from 'react-native-lottie-splash-screen';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { useAuthentication } from '../../_context';
import { StorageKey } from '../../_models';
import Error from '../../error/Error';
import Login from '../../login/Login';
import Onboarding from '../../onboarding/Onboarding';
import ProfileNotFound from '../../profile/ProfileNotFound';
import { TCheckInResponse } from '../../scan/_models';
import ScanSuccess from '../../scan/ScanSuccess';
import { storage } from '../../storage';
import { useGetVersions } from '../../update/_queries/useGetVersions';
import UpdateScreen from '../../update/UpdateScreen';
import { MainNavigator } from './MainNavigator';

export type TRootRoutes = 'MainNavigator' | 'Onboarding' | 'Login' | 'ProfileNotFound' | 'ScanSuccess' | 'Error' | 'Update';
export type TRootParams = Record<Exclude<TRootRoutes, 'ScanSuccess' | 'Error'>, undefined> & {
  Error: {
    message: string;
    onClose?: () => void;
  };
  ScanSuccess: TCheckInResponse;
};

const RootStack = createNativeStackNavigator<TRootParams>();

export const RootStackNavigator = () => {
  const { isAuthenticated, isInitialized } = useAuthentication();
  const versions = useGetVersions();
  const isPolicyApprovedInStorage = storage.getBoolean(StorageKey.IsPolicyApproved);

  useEffect(() => {
    if (isInitialized) SplashScreen.hide();
  }, [isInitialized]);

  useEffect(() => {
    // this is here so the user who is still logged in on reinstall of the app doesn't get the onboarding screen again
    if (!isPolicyApprovedInStorage && isAuthenticated) storage.set(StorageKey.IsPolicyApproved, true);
  }, [isAuthenticated]);

  return (
    <RootStack.Navigator screenOptions={{ headerShown: false }}>
      {!isAuthenticated && !isPolicyApprovedInStorage && <RootStack.Screen component={Onboarding} name="Onboarding" />}
      {Config.UPDATE_CHECK_ENABLED === 'true' && isAuthenticated && versions?.isBehindMinVersion && (
        <RootStack.Screen component={UpdateScreen} name="Update" />
      )}
      {!isAuthenticated && <RootStack.Screen component={Login} name="Login" />}
      {isAuthenticated && (
        <>
          <RootStack.Screen component={MainNavigator} name="MainNavigator" />
          <RootStack.Screen component={ProfileNotFound} name="ProfileNotFound" options={{ gestureEnabled: false }} />
          <RootStack.Screen component={ScanSuccess} name="ScanSuccess" options={{ gestureEnabled: false }} />
          <RootStack.Screen component={Error} name="Error" options={{ gestureEnabled: false }} />
        </>
      )}
    </RootStack.Navigator>
  );
};
