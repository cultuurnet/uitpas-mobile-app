import { TRewardCategory, TRewardType } from './reward';

export type TSearchFilters = {
  categories?: TRewardCategory[];
  featured?: boolean;
  forKids?: boolean;
  includeAllCardSystems?: boolean;
  isInterestingForPassholderId?: string;
  isRedeemableByPassholderId?: string;
  lastChance?: boolean;
  online?: boolean;
  organizerPostalCode?: string;
  sport?: boolean;
  type?: TRewardType;
  withoutSorting?: boolean;
};
