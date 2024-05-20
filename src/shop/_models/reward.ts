import { TCity } from '../../profile/_models';

export type TRewardCategory = 'Eten en drinken' | 'Doen' | 'Gadget of item' | 'Goede doel';
export type TRewardStatus = 'ACTIVE' | 'INACTIVE' | 'DELETED';
export type TRewardType = 'POINTS' | 'WELCOME' | 'ANY';

export type TCardSystem = {
  allowsCardlessRegistration: boolean;
  branding?: {
    logo?: string;
    primaryColor?: string;
    secondaryColor?: string;
  };
  cities: TCity[];
  id: number;
  links?: {
    website?: string;
  };
  name: string;
  permanent: boolean;
};

export type TPeriod = {
  begin: string;
  end?: string;
};

export type TRedeemConstraintPeriod = 'ABSOLUTE' | 'DAY' | 'WEEK' | 'MONTH' | 'QUARTER' | 'YEAR';

export type TRedeemConstraint = {
  period: TRedeemConstraintPeriod;
  volume: number;
};

export type TReward = {
  allCardSystems: boolean;
  applicableCardSystems: TCardSystem[];
  categories: TRewardCategory[];
  featured: boolean;
  forKids: boolean;
  grantingPeriod: TPeriod;
  id: string;
  inSpotlight: boolean;
  maxAvailableUnits: number;
  moreInfoURL: string;
  online: boolean;
  organizers: {
    id: string;
    name: string;
  }[];
  owningCardSystem: TCardSystem;
  pictures: string[];
  points: number;
  practicalInfo: string;
  promotionalDescription: string;
  publicationPeriod: TPeriod;
  redeemConstraint: TRedeemConstraint;
  redeemPeriod: TPeriod;
  sport: boolean;
  status: TRewardStatus;
  title: string;
  type: TRewardType;
  unitsTaken: number;
};

export type TRewardsResponse = {
  facet: unknown;
  member: TReward[];
  totalItems: number;
};

export type TRewardDetail = {
  id: string;
};
