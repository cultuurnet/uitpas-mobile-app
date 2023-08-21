import { useGetMe } from '../../profile/_queries/useGetMe';
import { TRewardCategory } from '../_models/reward';
import { TSearchFilters } from '../_models/searchFilters';

export type TFilterRewardSection =
  | 'online'
  | 'in de kijker'
  | 'populair regio'
  | 'populair'
  | 'stad voordelen'
  | 'sport'
  | 'interessant'
  | 'welkom';

export type TFilterRewardCategory = TRewardCategory | 'laatste kans' | 'forKids';

export function useRewardFilters() {
  const { data: user } = useGetMe();

  const getFiltersForSection = (section: TFilterRewardSection): TSearchFilters => {
    // filter for a section
    switch (section) {
      case 'online':
        return {
          online: true,
          withoutSorting: true,
        };
      case 'in de kijker':
        return {
          featured: true,
        };
      case 'populair':
        return {
          featured: true,
          includeAllCardSystems: true,
        };
      case 'interessant':
        return {
          includeAllCardSystems: true,
          isInterestingForPassholderId: user?.id,
        };
      case 'populair regio':
        return {};
      case 'stad voordelen':
        return {
          includeAllCardSystems: true,
          organizerPostalCode: user?.address?.postalCode,
        };
      case 'sport':
        return { sport: true };
      case 'welkom':
        return { includeAllCardSystems: true, isRedeemableByPassholderId: user?.id, type: 'WELCOME' };
    }
  };

  const getFiltersForCategory = (category: TFilterRewardCategory): TSearchFilters => {
    if (!category) return {};
    if (category === 'laatste kans') return { lastChance: true };
    if (category === 'forKids') return { forKids: true };
    return { categories: [category], withoutSorting: true };
  };

  return {
    getFiltersForCategory,
    getFiltersForSection,
  };
}
