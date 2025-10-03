import { usePubliqApi } from '../../_hooks/usePubliqApi';
import { TRewardsResponse } from '../_models/reward';

export const FEATURED_CARD_SYSTEM_ID = 4;

export function useGetFeaturedRewards() {
  const api = usePubliqApi();

  return api.get<TRewardsResponse>(['featured-rewards', FEATURED_CARD_SYSTEM_ID], '/rewards', {
    cacheTime: 0,
    params: {
      featured: true,
      owningCardSystemId: FEATURED_CARD_SYSTEM_ID,
    },
    refetchOnWindowFocus: true,
    staleTime: 0,
  });
}
