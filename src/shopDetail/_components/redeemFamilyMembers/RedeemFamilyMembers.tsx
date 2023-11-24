import { useCallback } from 'react';

import { FamilyMemberPoints } from '../../../_components/family/familyMemberPoints/FamilyMemberPoints';
import { useGetFamilyMembers } from '../../../onboarding/family/_queries';
import { RedeemButton } from './redeemButton/RedeemButton';

type TProps = {
  rewardId: string;
};

export const RedeemFamilyMembers = ({ rewardId }: TProps) => {
  const { data: familyMembers } = useGetFamilyMembers();

  const RedeemButtonMemoized = useCallback(
    ({ familyMember }) => <RedeemButton familyMember={familyMember} rewardId={rewardId} />,
    [rewardId],
  );

  return <FamilyMemberPoints RightComponent={RedeemButtonMemoized} familyMembers={familyMembers} />;
};
