import { usePubliqApi } from '../../_hooks/usePubliqApi';
import { TPassHolder } from '../../profile/_models';
import { THistoryResponse } from '../_models';

type TProps = {
  passHolder: TPassHolder;
};

export function useGetHistory({ passHolder }: TProps) {
  const api = usePubliqApi();

  return api.getInfinite<THistoryResponse>(['history', passHolder.id], `/passholders/${passHolder.id}/transactions`, {
    itemsPerPage: 10,
  });
}
