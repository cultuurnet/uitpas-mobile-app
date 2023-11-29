import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { CompositeNavigationProp, RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

import { TFamilyMember } from '../../profile/_models';
import { TRedeemedReward } from '../../redeemedRewards/_models/redeemedReward';
import { TCheckInResponse } from '../../scan/_models';
import { TFamilyScanResponse } from '../../scan/familyScanSummary/_models';
import { TFilterRewardCategory, TFilterRewardSection } from '../../shop/_hooks/useRewardFilters';
import { TReward, TRewardType } from '../../shop/_models/reward';
import { TSearchFilters } from '../../shop/_models/searchFilters';
import { TFilterRewardSorting } from '../../shop/_queries/useGetRewards';

export type TRootRoute = keyof TRootStackParamList;
export type TMainRoute = keyof TMainParamsList;
export type TRoute = TRootRoute | TMainRoute;

// Specific prop exports
export type TRootStackNavigationProp<RouteName extends TRootRoute = TRootRoute> = NativeStackNavigationProp<
  TRootStackParamList,
  RouteName
>;
export type TRootStackRouteProp<RouteName extends TRootRoute = TRootRoute> = RouteProp<TRootStackParamList, RouteName>;

// This is typed here, because if we do it in the MainNavigator file, we would create a circular dependency
export type TMainNavigationProp<RouteName extends TMainRoute = TMainRoute> = CompositeNavigationProp<
  BottomTabNavigationProp<TMainParamsList, RouteName>,
  NativeStackNavigationProp<TRootStackParamList>
>;
export type TMainRouteProp<RouteName extends TMainRoute = TMainRoute> = RouteProp<TMainParamsList, RouteName>;

export type TRootStackParamList = {
  About: undefined;
  AddFamilyMember: { familyMembers: TFamilyMember[] };
  AddFamilyMemberError: { description: string };
  CheckInMore: { checkinCode: string };
  EditFamilyMember: { member: TFamilyMember };
  Error: {
    gotoAfterClose?: [TRootRoute, TMainRoute] | keyof TRootStackParamList;
    message: string;
  };
  FamiliesOverview: undefined;
  FamilyInformation: undefined;
  FamilyOnboarding: undefined;
  FamilyOverview: undefined;
  FamilyScanSummary: {
    memberResponses: {
      member: TFamilyMember;
      response: TFamilyScanResponse;
    }[];
  };
  FilteredShop: {
    category?: TFilterRewardCategory;
    section?: TFilterRewardSection;
    subtitle?: string;
    type?: TRewardType;
  };
  History: undefined;
  Login: undefined;
  MainNavigator: { screen: TMainRoute };
  Onboarding: undefined;
  ProfileNotFound: undefined;
  RedeemedReward: { isModal?: boolean; redeemedReward: TRedeemedReward };
  RedeemedRewards: undefined;
  ScanSuccess: TCheckInResponse & { checkinCode: string };
  Search: { category?: TFilterRewardCategory; filters?: TSearchFilters; sort?: TFilterRewardSorting };
  SearchFilters: { category?: TFilterRewardCategory; filters: TSearchFilters; sort: TFilterRewardSorting };
  ShopDetail: { id: string; reward?: TReward };
  Update: undefined;
};

export type TMainParamsList = {
  Camera: undefined;
  Profile: undefined;
  Shop: undefined;
};
