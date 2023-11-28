import { useGetFamilyMembers } from '../../../onboarding/family/_queries';
import { useGetMe } from '../../_queries/useGetMe';

export const useFamily = () => {
  const { data: me, isLoading: isLoadingMe, isError: isErrorMe } = useGetMe();
  const { data: familyMembers, isLoading: isLoadingFamilyMembers, isError: isErrorFamilyMembers } = useGetFamilyMembers();

  return {
    familyMembers,
    inFamily: familyMembers?.length > 1,
    isErrorFamilyMembers,
    isErrorMe,
    isLoadingFamilyMembers,
    isLoadingMe,
    me,
  };
};
