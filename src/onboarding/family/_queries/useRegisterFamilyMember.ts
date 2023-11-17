import { usePubliqApi } from '../../../_hooks/usePubliqApi';
import { useGetMe } from '../../../profile/_queries/useGetMe';

type TRegisterFamilyMemberBody = {
  icon: string;
  uitpasNumber: string;
};

export const useRegisterFamilyMember = (registrationToken: string) => {
  const { data: user } = useGetMe();
  const api = usePubliqApi();

  return api.post<string, TRegisterFamilyMemberBody>(
    ['family-member-registration', registrationToken],
    `/passholders/${user?.id}/family-members`,
    { headers: { 'x-registration-token': registrationToken } },
  );
};
