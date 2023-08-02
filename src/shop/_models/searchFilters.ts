import { TRewardCategory, TRewardType } from './reward';

export type TSearchFilters = {
  categories?: TRewardCategory[];
  featured?: boolean;
  forKids?: boolean;
  includeAllCardSystems?: boolean;
  isInterestingForPassholderId?: boolean;
  isRedeemableByPassholderId?: boolean;
  lastChance?: boolean;
  online?: boolean;
  organizerPostalCode?: boolean;
  sport?: boolean;
  type?: TRewardType;
  withoutSorting?: boolean;
};
