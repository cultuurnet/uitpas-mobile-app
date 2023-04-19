import { usePubliqApi } from '../../_hooks/usePubliqApi';
import { TApiError } from '../../_http';
import { useActiveCard } from '../../profile/_queries/useActiveCard';
import { TRedeemedRewardsResponse } from '../_models/redeemedReward';

export function useGetRedeemedRewards() {
  const api = usePubliqApi();
  const activeCard = useActiveCard();

  return api.getInfinite<TRedeemedRewardsResponse>(
    ['rewards', 'redeemed', activeCard?.uitpasNumber],
    `/rewards/redeemed?uitpasNumber=${activeCard?.uitpasNumber}`,
    {
      enabled: !!activeCard?.uitpasNumber,
      itemsPerPage: 20,
      onError: (_error: TApiError) => {
        // TODO: Handle error
      },
    },
  );
}
