import React, { useEffect } from 'react';
import SplashScreen from 'react-native-lottie-splash-screen';
import { HeaderBackButton } from '@react-navigation/elements';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { Icon } from '../../_components';
import { FamilyUserPoints, SingleUserPoints } from '../../_components/userPoints';
import { ConfigUrl } from '../../_config';
import { useAuthentication, useOnboarding } from '../../_context';
import { StorageKey } from '../../_models';
import { generalStyles } from '../../_styles/constants';
import i18n from '../../_translations/i18n';
import { openExternalURL } from '../../_utils';
import About from '../../about/About';
import Error from '../../error/Error';
import { FilteredShop } from '../../filteredShop/FilteredShop';
import History from '../../history/History';
import Login from '../../login/Login';
import {
  AddFamilyMember,
  AddFamilyMemberError,
  EditFamilyMember,
  FamilyInformation,
  FamilyOnboarding,
  FamilyOverview,
  OtherFamiliesOverview,
} from '../../onboarding/family';
import Onboarding from '../../onboarding/Onboarding';
import { FamiliesOverview } from '../../profile/family/FamiliesOverview';
import { useFamilyComposition } from '../../profile/family/hooks';
import ProfileNotFound from '../../profile/ProfileNotFound';
import RedeemedReward from '../../redeemedReward/RedeemedReward';
import { RedeemedRewards } from '../../redeemedRewards/RedeemedRewards';
import FamilyCheckin from '../../scan/familyCheckin/FamilyCheckin';
import { FamilyCheckinSummary } from '../../scan/familyCheckinSummary/FamilyCheckinSummary';
import ScanSuccess from '../../scan/ScanSuccess';
import { Search } from '../../shop/search/Search';
import { SearchFilters } from '../../shop/searchFilters/SearchFilters';
import { ShopDetail } from '../../shopDetail/ShopDetail';
import { storage } from '../../storage';
import { useGetVersions } from '../../update/_queries/useGetVersions';
import UpdateScreen from '../../update/UpdateScreen';
import { MainNavigator, useMainHeaderProps } from './MainNavigator';
import { TRootStackParamList } from './TRootStackParamList';

const RootStack = createNativeStackNavigator<TRootStackParamList>();

export const RootStackNavigator = () => {
  const { isAuthenticated, isInitialized } = useAuthentication();
  const { showFamilyOnboarding } = useOnboarding();
  const versions = useGetVersions();
  const getMainHeaderProps = useMainHeaderProps(isAuthenticated);
  const UserPoints = useFamilyComposition({ FamilyComponent: FamilyUserPoints, SingleComponent: SingleUserPoints });
  const isPolicyApprovedInStorage = storage.getBoolean(StorageKey.IsPolicyApproved);

  useEffect(() => {
    if (isInitialized) SplashScreen.hide();
  }, [isInitialized]);

  useEffect(() => {
    // this is here so the user who is still logged in on reinstall of the app doesn't get the onboarding screen again
    if (!isPolicyApprovedInStorage && isAuthenticated) storage.set(StorageKey.IsPolicyApproved, true);
  }, [isAuthenticated, isPolicyApprovedInStorage]);

  return (
    <RootStack.Navigator
      screenOptions={{
        ...generalStyles.navigationHeader,
        gestureEnabled: true,
      }}
    >
      <RootStack.Group screenOptions={{ headerShown: false }}>
        {!isAuthenticated && !isPolicyApprovedInStorage && <RootStack.Screen component={Onboarding} name="Onboarding" />}
        {isAuthenticated && versions?.isBehindMinVersion && <RootStack.Screen component={UpdateScreen} name="Update" />}
        {!isAuthenticated && <RootStack.Screen component={Login} name="Login" />}
      </RootStack.Group>
      {isAuthenticated && showFamilyOnboarding && (
        <RootStack.Group navigationKey={showFamilyOnboarding.toString()} screenOptions={{ headerShown: true }}>
          <RootStack.Screen
            component={FamilyOnboarding}
            name="FamilyOnboarding"
            options={{ gestureEnabled: false, headerShown: false }}
          />
          <RootStack.Screen
            component={FamilyOverview}
            name="FamilyOverview"
            options={{
              gestureEnabled: false,
              headerBackVisible: false,
              title: i18n.t('ONBOARDING.FAMILY.OVERVIEW.TITLE'),
            }}
          />
          <RootStack.Screen
            component={AddFamilyMember}
            name="AddFamilyMember"
            options={{
              headerBackTitleVisible: false,
              title: i18n.t('ONBOARDING.FAMILY.ADD_MEMBER.TITLE'),
            }}
          />
          <RootStack.Screen
            component={AddFamilyMemberError}
            name="AddFamilyMemberError"
            options={{
              gestureEnabled: false,
              headerShown: false,
            }}
          />
          <RootStack.Screen
            component={EditFamilyMember}
            name="EditFamilyMember"
            options={{
              headerBackTitleVisible: false,
              title: i18n.t('ONBOARDING.FAMILY.EDIT_MEMBER.TITLE'),
            }}
          />
          <RootStack.Screen
            component={FamilyInformation}
            name="FamilyInformation"
            options={{
              gestureEnabled: false,
              headerBackVisible: false,
              headerRight: UserPoints,
              title: i18n.t('NAVIGATION.SHOP'),
            }}
          />
        </RootStack.Group>
      )}
      {isAuthenticated && !showFamilyOnboarding && (
        <>
          <RootStack.Screen
            component={MainNavigator}
            name="MainNavigator"
            options={({ route }) => ({
              ...getMainHeaderProps(route),
            })}
          />
          <RootStack.Screen
            component={FamilyCheckin}
            name="FamilyCheckin"
            options={({ navigation }) => ({
              headerBackVisible: false,
              headerLeft: null,
              headerRight: props => (
                <HeaderBackButton
                  {...props}
                  backImage={() => <Icon color="neutral.0" name="Close" size={14} />}
                  labelVisible={false}
                  onPress={() => navigation.pop()}
                  style={{ marginRight: -10, padding: 10 }}
                />
              ),
              title: i18n.t('SCAN.FAMILY_MEMBERS.TITLE'),
            })}
          />
          <RootStack.Group screenOptions={{ headerShown: false }}>
            <RootStack.Screen component={FamilyCheckinSummary} name="FamilyCheckinSummary" options={{ gestureEnabled: false }} />
            <RootStack.Screen component={ScanSuccess} name="ScanSuccess" options={{ gestureEnabled: false }} />
            <RootStack.Screen component={Error} name="Error" options={{ gestureEnabled: false }} />
            <RootStack.Screen component={Search} name="Search" />
          </RootStack.Group>
          <RootStack.Screen
            component={About}
            name="About"
            options={{
              headerBackTitleVisible: false,
              title: i18n.t('PROFILE.ABOUT.HEADER_TITLE'),
            }}
          />
          <RootStack.Screen
            component={FilteredShop}
            name="FilteredShop"
            options={({ route }) => ({
              headerBackButtonMenuEnabled: false,
              headerBackTitleVisible: false,
              headerRight: UserPoints,
              title: route?.params?.section === 'welkom' ? i18n.t('SHOP.WELCOME.HEADER_TITLE') : i18n.t('SHOP.HEADER_TITLE'),
            })}
          />
          <RootStack.Screen
            component={History}
            name="History"
            options={{
              headerBackTitleVisible: false,
              headerRight: UserPoints,
              title: i18n.t('PROFILE.HISTORY.HEADER_TITLE'),
            }}
          />
          <RootStack.Screen
            component={RedeemedRewards}
            name="RedeemedRewards"
            options={{
              headerBackTitleVisible: false,
              headerRight: UserPoints,
              title: i18n.t('PROFILE.REDEEMED_REWARDS.HEADER_TITLE'),
            }}
          />
          <RootStack.Screen
            component={RedeemedReward}
            name="RedeemedReward"
            options={({ navigation, route }) => ({
              headerBackTitleVisible: false,
              headerRight: props =>
                route.params?.isModal ? (
                  <HeaderBackButton
                    {...props}
                    backImage={() => <Icon color="neutral.0" name="Close" size={14} />}
                    labelVisible={false}
                    onPress={() => navigation.pop()}
                    style={{ marginRight: -10, padding: 10 }}
                  />
                ) : null,
              presentation: route.params?.isModal ? 'modal' : 'card',
              title: i18n.t('REDEEMED_REWARD.HEADER_TITLE'),
            })}
          />
          <RootStack.Screen
            component={ShopDetail}
            name="ShopDetail"
            options={{
              headerBackButtonMenuEnabled: false,
              headerBackTitleVisible: false,
              headerRight: UserPoints,
              title: i18n.t('SHOP_DETAIL.HEADER_TITLE'),
            }}
          />
          <RootStack.Screen
            component={SearchFilters}
            name="SearchFilters"
            options={({ navigation }) => ({
              headerBackTitleVisible: false,
              headerBackVisible: false,
              headerRight: props => (
                <HeaderBackButton
                  {...props}
                  backImage={() => <Icon color="neutral.0" name="Close" size={14} />}
                  labelVisible={false}
                  onPress={() => navigation.pop()}
                  style={{ marginRight: -10, padding: 10 }}
                />
              ),
              presentation: 'modal',
              title: i18n.t('SHOP.SEARCH.FILTERS.HEADER_TITLE'),
            })}
          />
          <RootStack.Group
            screenOptions={{
              headerBackTitleVisible: false,
            }}
          >
            <RootStack.Screen
              component={FamilyOverview}
              name="FamilyOverview"
              options={{
                headerRight: () => (
                  <Icon color="neutral.0" name="Info" onPress={() => openExternalURL(ConfigUrl.familyFaq)} size={24} />
                ),
                title: i18n.t('ONBOARDING.FAMILY.OVERVIEW.TITLE'),
              }}
            />
            <RootStack.Screen
              component={OtherFamiliesOverview}
              name="MyFamilies"
              options={{
                title: i18n.t('ONBOARDING.FAMILY.OTHER_FAMILIES.TITLE'),
              }}
            />
            <RootStack.Screen
              component={AddFamilyMember}
              name="AddFamilyMember"
              options={{
                title: i18n.t('ONBOARDING.FAMILY.ADD_MEMBER.TITLE'),
              }}
            />
            <RootStack.Screen
              component={AddFamilyMemberError}
              name="AddFamilyMemberError"
              options={{
                gestureEnabled: false,
                headerShown: false,
              }}
            />
            <RootStack.Screen
              component={EditFamilyMember}
              name="EditFamilyMember"
              options={{
                title: i18n.t('ONBOARDING.FAMILY.EDIT_MEMBER.TITLE'),
              }}
            />
            <RootStack.Screen
              component={FamiliesOverview}
              name="FamiliesOverview"
              options={{
                headerBackTitleVisible: false,
                title: i18n.t('PROFILE.LINKS.MY_FAMILY'),
              }}
            />
          </RootStack.Group>
        </>
      )}

      {isAuthenticated && (
        <RootStack.Group screenOptions={{ headerShown: false }}>
          <RootStack.Screen component={ProfileNotFound} name="ProfileNotFound" options={{ gestureEnabled: false }} />
        </RootStack.Group>
      )}
    </RootStack.Navigator>
  );
};
