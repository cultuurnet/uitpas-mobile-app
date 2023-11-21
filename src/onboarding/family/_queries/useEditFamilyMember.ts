import { MutateOptions, useMutation } from '@tanstack/react-query';

import { TMutationParams, usePubliqApi } from '../../../_hooks/usePubliqApi';
import { useGetMe } from '../../../profile/_queries/useGetMe';

export type TEditFamilyMemberParams = TMutationParams<{
  icon: string;
}>;

export const useEditFamilyMember = (familyMemberId: string) => {
  const { data: user } = useGetMe();
  const api = usePubliqApi();

  return api.put<string, TEditFamilyMemberParams>(
    ['family-member-edit'],
    `/passholders/${user.id}/family-members/${familyMemberId}`,
  );
};
