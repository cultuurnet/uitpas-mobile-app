import { queryClient } from '../../_context';
import { TPostOptions, usePubliqApi } from '../../_hooks/usePubliqApi';
import { TRedeemedReward } from '../../redeemedRewards/_models/redeemedReward';

export function useRedeemReward(options: TPostOptions<TRedeemedReward>) {
  const api = usePubliqApi();
  return api.post<TRedeemedReward>(['redeem-rewards'], '/rewards/redeemed', {
    ...options,
    onSuccess: (...args) => {
      // Reset me call so we will fetch the userpoints again
      queryClient.invalidateQueries({ queryKey: ['me'] });
      options.onSuccess(...args);
    },
  });
}
