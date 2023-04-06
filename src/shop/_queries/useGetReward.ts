import { usePubliqApi } from '../../_hooks/usePubliqApi';
import { TApiError } from '../../_http';
import { TRewardDetail } from '../_models/reward';

export function useGetRewards({ id }: { id: string }) {
  const api = usePubliqApi();

  return api.get<TRewardDetail>(['rewards', id], `/rewards/${id}`, {
    onError: (_error: TApiError) => {
      // TODO: Handle error
    },
  });
}
