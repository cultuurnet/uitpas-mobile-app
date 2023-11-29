import { useCallback } from 'react';

import { FamilyMembersPoints } from '../../../_components/family/familyMembersPoints/FamilyMembersPoints';
import { useGetFamilyMembers } from '../../../onboarding/family/_queries';
import { TFamilyMember } from '../../../profile/_models';
import { RedeemButton } from './redeemButton/RedeemButton';

type TProps = {
  onRedeem: (member: TFamilyMember) => void;
  rewardId: string;
};

export const RedeemFamilyMembers = ({ rewardId, onRedeem }: TProps) => {
  const { data: familyMembers } = useGetFamilyMembers();

  const RedeemButtonMemoized = useCallback(
    ({ member }: { member: TFamilyMember }) => (
      <RedeemButton member={member} onPress={() => onRedeem(member)} rewardId={rewardId} />
    ),
    [onRedeem, rewardId],
  );

  return <FamilyMembersPoints RightComponent={RedeemButtonMemoized} members={familyMembers} />;
};
