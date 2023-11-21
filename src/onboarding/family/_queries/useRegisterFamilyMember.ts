import { TMutationParams, usePubliqApi } from '../../../_hooks/usePubliqApi';
import { useGetMe } from '../../../profile/_queries/useGetMe';

type TRegisterFamilyMemberParams = TMutationParams<{
  icon: string;
  uitpasNumber: string;
}>;

export const useRegisterFamilyMember = () => {
  const { data: user } = useGetMe();
  const api = usePubliqApi();

  return api.post<string, TRegisterFamilyMemberParams>(['family-member-registration'], `/passholders/${user?.id}/family-members`);
};
