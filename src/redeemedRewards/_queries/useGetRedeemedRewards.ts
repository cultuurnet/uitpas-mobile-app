import { usePubliqApi } from '../../_hooks/usePubliqApi';
import { getActiveCard } from '../../profile/_helpers/getActiveCard';
import { TPassHolder } from '../../profile/_models';
import { TRedeemedRewardsResponse } from '../_models/redeemedReward';

type TProps = { passHolder: TPassHolder };

export function useGetRedeemedRewards({ passHolder }: TProps) {
  const api = usePubliqApi();

  const activeCard = getActiveCard({ passHolder });

  return api.getInfinite<TRedeemedRewardsResponse>(
    ['rewards', 'redeemed', activeCard?.uitpasNumber],
    `/rewards/redeemed?uitpasNumber=${activeCard?.uitpasNumber}`,
    { enabled: !!activeCard?.uitpasNumber, itemsPerPage: 20 },
  );
}
