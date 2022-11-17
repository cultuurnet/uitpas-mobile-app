import { usePubliqApi } from '../../_hooks/usePubliqApi';
import { TPassHolder } from '../_models';

export function useGetMe() {
  const api = usePubliqApi();
  return api.get<TPassHolder>(['me'], '/passholders/me');
}
