import { ReactElement } from 'react';

import { useGetFamilyMembers } from '../../../onboarding/family/_queries';
import { TFamilyMember, TPassHolder } from '../../_models';
import { useGetMe } from '../../_queries/useGetMe';

type TProps = {
  FamilyComponent: ({ members }: { members: TFamilyMember[] }) => ReactElement;
  SingleComponent: ({ passHolder }: { passHolder: TPassHolder }) => ReactElement;
};

export const useFamilyComposition = ({ FamilyComponent, SingleComponent }: TProps) => {
  const { data: me, isLoading: isLoadingMe, isError: isErrorMe } = useGetMe();
  const { data: familyMembers = [], isLoading: isLoadingFamilyMembers, isError: isErrorFamilyMembers } = useGetFamilyMembers();

  if (isLoadingMe || isLoadingFamilyMembers || isErrorMe || isErrorFamilyMembers) {
    return () => null;
  }

  if (familyMembers.length === 1) {
    return () => <SingleComponent passHolder={me} />;
  }

  return () => <FamilyComponent members={familyMembers} />;
};
