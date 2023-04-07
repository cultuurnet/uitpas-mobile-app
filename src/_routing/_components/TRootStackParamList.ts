import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { CompositeNavigationProp, RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

import { TCheckInResponse } from '../../scan/_models';
import { TRewardType } from '../../shop/_models/reward';
import { TFilterRewardCategory, TFilterRewardSections } from '../../shop/_queries/useGetRewards';

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
  Error: {
    gotoAfterClose?: [TRootRoute, TMainRoute] | keyof TRootStackParamList;
    message: string;
  };
  FilteredShop: {
    category?: TFilterRewardCategory;
    filter?: TFilterRewardSections;
    subtitle?: string;
    type?: TRewardType;
  };
  History: undefined;
  Login: undefined;
  MainNavigator: { screen: TMainRoute };
  Onboarding: undefined;
  ProfileNotFound: undefined;
  ScanSuccess: TCheckInResponse;
  Update: undefined;
};

export type TMainParamsList = {
  Camera: undefined;
  Profile: undefined;
  Shop: undefined;
};
