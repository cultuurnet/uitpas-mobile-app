import { usePubliqApi } from '../../_hooks/usePubliqApi';
import { TApiError } from '../../_http';
import { TReward } from '../_models/reward';

export function useGetReward({ id }: { id: string }) {
  const api = usePubliqApi();

  return api.get<TReward>(['rewards', id], `/rewards/${id}`, {
    onError: (_error: TApiError) => {
      // TODO: Handle error
    },
  });
}
