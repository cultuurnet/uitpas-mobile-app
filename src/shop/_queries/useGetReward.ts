import { usePubliqApi } from '../../_hooks/usePubliqApi';
import { TReward } from '../_models/reward';

export function useGetReward({ id }: { id: string }) {
  const api = usePubliqApi();

  return api.get<TReward>(['rewards', id], `/rewards/${id}`);
}
