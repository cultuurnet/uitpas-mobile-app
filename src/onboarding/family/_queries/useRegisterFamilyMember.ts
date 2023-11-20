import { usePubliqApi } from '../../../_hooks/usePubliqApi';
import { Headers } from '../../../_http/HttpClient';
import { useGetMe } from '../../../profile/_queries/useGetMe';

type TRegisterFamilyMemberParams = {
  body: {
    icon: string;
    uitpasNumber: string;
  };
  headers: Headers;
};

export const useRegisterFamilyMember = () => {
  const { data: user } = useGetMe();
  const api = usePubliqApi();

  return api.post<string, TRegisterFamilyMemberParams>(['family-member-registration'], `/passholders/${user?.id}/family-members`);
};
