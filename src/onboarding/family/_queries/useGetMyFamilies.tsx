import { usePubliqApi } from '../../../_hooks/usePubliqApi';
import { TFamily } from '../../../profile/_models';
import { useGetMe } from '../../../profile/_queries/useGetMe';

export const useGetMyFamilies = () => {
  const api = usePubliqApi();
  const { data: me } = useGetMe();

  return api.get<TFamily[]>(['family'], `/passholders/${me.id}/families`, {
    enabled: !!me.id,
  });
};
