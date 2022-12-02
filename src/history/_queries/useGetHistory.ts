import { usePubliqApi } from '../../_hooks/usePubliqApi';
import { THistoryResponse } from '../_models';

export function useGetHistory() {
  const api = usePubliqApi();

  return api.getInfinite<THistoryResponse>(['history'], '/passholders/me/transactions', { itemsPerPage: 10 });
}
