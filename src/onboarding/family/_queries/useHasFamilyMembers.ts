import { usePubliqApi } from '../../../_hooks/usePubliqApi';
import { TFamilyMember } from '../../../profile/_models';
import { useGetMe } from '../../../profile/_queries/useGetMe';

export const useHasFamilyMembers = () => {
  const api = usePubliqApi();
  const { data: user } = useGetMe();

  const response = api.get<TFamilyMember[]>(
    ['family', 'has-family-members', user?.id],
    `/passholders/${user?.id}/family-members`,
    {
      enabled: !!user?.id,
    },
  );

  return { ...response, data: response.data?.some?.(({ mainFamilyMember }) => !mainFamilyMember) };
};
