import { usePubliqApi } from '../../../_hooks/usePubliqApi';
import { TFamilyMember } from '../../../profile/_models';
import { useGetMe } from '../../../profile/_queries/useGetMe';

export const useGetFamilyMembers = () => {
  const api = usePubliqApi();
  const { data: user } = useGetMe();

  return api.get<TFamilyMember[]>(['family-members'], `/passholders/${encodeURIComponent(user?.id)}/family-members`, {
    enabled: !!user?.id,
    retry: false,
  });
};
