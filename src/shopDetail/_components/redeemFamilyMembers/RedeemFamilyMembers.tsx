import { useCallback } from 'react';

import { FamilyMembersPoints } from '../../../_components';
import { useGetFamilyMembers } from '../../../onboarding/family/_queries';
import { TFamilyMember } from '../../../profile/_models';
import { TReward } from '../../../shop/_models/reward';
import { RedeemFamilyButton } from './redeemFamilyButton/RedeemFamilyButton';

type TProps = {
  onRedeem: (member: TFamilyMember) => void;
  reward: TReward;
};

export const RedeemFamilyMembers = ({ reward, onRedeem }: TProps) => {
  const { data: familyMembers = [] } = useGetFamilyMembers();

  const RedeemFamilyButtonMemoized = useCallback(
    ({ item: { member } }) => <RedeemFamilyButton member={member} onPress={() => onRedeem(member)} reward={reward} />,
    [onRedeem, reward],
  );

  return (
    <FamilyMembersPoints ItemRightComponent={RedeemFamilyButtonMemoized} members={familyMembers.map(member => ({ member }))} />
  );
};
