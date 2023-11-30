import { useCallback } from 'react';

import { FamilyMemberPoints } from '../../../_components/family/familyMemberPoints/FamilyMemberPoints';
import { useGetFamilyMembers } from '../../../onboarding/family/_queries';
import { TFamilyMember } from '../../../profile/_models';
import { RedeemButton } from './redeemButton/RedeemButton';

type TProps = {
  onRedeem: (familyMember: TFamilyMember) => void;
  rewardId: string;
};

export const RedeemFamilyMembers = ({ rewardId, onRedeem }: TProps) => {
  const { data: familyMembers } = useGetFamilyMembers();

  const RedeemButtonMemoized = useCallback(
    ({ familyMember }) => <RedeemButton familyMember={familyMember} onPress={() => onRedeem(familyMember)} rewardId={rewardId} />,
    [onRedeem, rewardId],
  );

  return <FamilyMemberPoints RightComponent={RedeemButtonMemoized} familyMembers={familyMembers} />;
};
