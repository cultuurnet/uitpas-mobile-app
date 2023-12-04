import { usePubliqApi } from '../../_hooks/usePubliqApi';
import { TApiError } from '../../_http';
import { getActiveCard } from '../../profile/_helpers/getActiveCard';
import { useGetMe } from '../../profile/_queries/useGetMe';
import { TRedeemedRewardsResponse } from '../_models/redeemedReward';

export function useGetRedeemedRewards() {
  const api = usePubliqApi();
  const { data: me } = useGetMe();

  const activeCard = getActiveCard({ passHolder: me });

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
