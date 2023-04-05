import React, { useEffect } from 'react';
import SplashScreen from 'react-native-lottie-splash-screen';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { useAuthentication } from '../../_context';
import { StorageKey } from '../../_models';
import { generalStyles } from '../../_styles/constants';
import i18n from '../../_translations/i18n';
import About from '../../about/About';
import Error from '../../error/Error';
import History from '../../history/History';
import Login from '../../login/Login';
import Onboarding from '../../onboarding/Onboarding';
import ProfileNotFound from '../../profile/ProfileNotFound';
import ScanSuccess from '../../scan/ScanSuccess';
import { storage } from '../../storage';
import { useGetVersions } from '../../update/_queries/useGetVersions';
import UpdateScreen from '../../update/UpdateScreen';
import { MainNavigator, useMainHeaderProps } from './MainNavigator';
import { TRootStackParamList } from './TRootStackParamList';

const RootStack = createNativeStackNavigator<TRootStackParamList>();

export const RootStackNavigator = () => {
  const { isAuthenticated, isInitialized } = useAuthentication();
  const versions = useGetVersions();
  const getMainHeaderProps = useMainHeaderProps(isAuthenticated);
  const isPolicyApprovedInStorage = storage.getBoolean(StorageKey.IsPolicyApproved);

  useEffect(() => {
    if (isInitialized) SplashScreen.hide();
  }, [isInitialized]);

  useEffect(() => {
    // this is here so the user who is still logged in on reinstall of the app doesn't get the onboarding screen again
    if (!isPolicyApprovedInStorage && isAuthenticated) storage.set(StorageKey.IsPolicyApproved, true);
  }, [isAuthenticated]);

  return (
    <RootStack.Navigator screenOptions={{
      ...generalStyles.navigationHeader,
    }}>
      <RootStack.Group screenOptions={{ headerShown: false }}>
        {!isAuthenticated && !isPolicyApprovedInStorage && <RootStack.Screen component={Onboarding} name="Onboarding" />}
        {isAuthenticated && versions?.isBehindMinVersion && <RootStack.Screen component={UpdateScreen} name="Update" />}
        {!isAuthenticated && <RootStack.Screen component={Login} name="Login" />}
      </RootStack.Group>
      {isAuthenticated && (
        <>
          <RootStack.Screen component={MainNavigator} name="MainNavigator" options={({ route }) => ({
            ...getMainHeaderProps(route),
          })}
          />
          <RootStack.Group screenOptions={{ headerShown: false }}>
            <RootStack.Screen component={ProfileNotFound} name="ProfileNotFound" options={{ gestureEnabled: false }} />
            <RootStack.Screen component={ScanSuccess} name="ScanSuccess" options={{ gestureEnabled: false }} />
            <RootStack.Screen component={Error} name="Error" options={{ gestureEnabled: false }} />
          </RootStack.Group>

          <RootStack.Screen
            component={About}
            name="About"
            options={{
              headerBackTitle: i18n.t('PROFILE.ABOUT.BACK_TITLE'),
              headerTitle: i18n.t('PROFILE.ABOUT.HEADER_TITLE'),
            }}
          />
          <RootStack.Screen
            component={History}
            name="History"
            options={{
              headerBackTitle: i18n.t('PROFILE.HISTORY.BACK_TITLE'),
              headerTitle: i18n.t('PROFILE.HISTORY.HEADER_TITLE'),
            }}
          />
        </>
      )}
    </RootStack.Navigator>
  );
};
