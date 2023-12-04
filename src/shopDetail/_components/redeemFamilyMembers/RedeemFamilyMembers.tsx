import { useCallback } from 'react';

import { FamilyMembersPoints } from '../../../_components';
import { useGetFamilyMembers } from '../../../onboarding/family/_queries';
import { TFamilyMember } from '../../../profile/_models';
import { TReward } from '../../../shop/_models/reward';
import { RedeemButton } from './redeemButton/RedeemButton';

type TProps = {
  onRedeem: (member: TFamilyMember) => void;
  reward: TReward;
};

export const RedeemFamilyMembers = ({ reward, onRedeem }: TProps) => {
  const { data: familyMembers = [] } = useGetFamilyMembers();

  const RedeemButtonMemoized = useCallback(
    ({ item: { member } }) => <RedeemButton member={member} onPress={() => onRedeem(member)} reward={reward} />,
    [onRedeem, reward],
  );

  return <FamilyMembersPoints ItemRightComponent={RedeemButtonMemoized} members={familyMembers.map(member => ({ member }))} />;
};
