import { usePubliqApi } from '../../../_hooks/usePubliqApi';
import { useGetMe } from '../../../profile/_queries/useGetMe';

export const useDeleteFamilyMember = (familyMemberId: string) => {
  const {
    data: { id: passholderId },
  } = useGetMe();
  const api = usePubliqApi();
  return api.deleteMutation<string>(['family-member-delete'], `/passholders/${passholderId}/family-members/${familyMemberId}`);
};
