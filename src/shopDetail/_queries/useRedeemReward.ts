import { queryClient } from '../../_context';
import { TPostOptions, usePubliqApi } from '../../_hooks/usePubliqApi';
import { TRedeemedReward } from '../../redeemedRewards/_models/redeemedReward';

export function useRedeemReward(options: TPostOptions<TRedeemedReward>) {
  const api = usePubliqApi();
  return api.post<TRedeemedReward>(['redeem-rewards'], '/rewards/redeemed', {
    ...options,
    onSuccess: (data, variables, context) => {
      // Reset me call so we will fetch the userpoints again
      queryClient.invalidateQueries(['me']);
      options.onSuccess(data, variables, context);
    },
  });
}
