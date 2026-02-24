import { memo, useMemo } from 'react';

import { FamilyMembersPoints } from '../../../_components';
import { useGetFamilyMembers } from '../../../onboarding/family/_queries';
import { TFamilyMember } from '../../../profile/_models';
import { TReward } from '../../../shop/_models/reward';
import { RedeemFamilyButton } from './redeemFamilyButton/RedeemFamilyButton';

type TProps = {
  onRedeem: (member: TFamilyMember) => void;
  reward: TReward;
};

type TFamilyMemberItem = {
  member: TFamilyMember;
  onRedeem: (member: TFamilyMember) => void;
  reward: TReward;
};

const RedeemFamilyItemRight = ({ item }: { item: TFamilyMemberItem }) => (
  <RedeemFamilyButton member={item.member} onPress={() => item.onRedeem(item.member)} reward={item.reward} />
);

export const RedeemFamilyMembers = memo(({ reward, onRedeem }: TProps) => {
  const { data: familyMembers = [] } = useGetFamilyMembers();

  const members = useMemo(() => familyMembers.map(member => ({ member, onRedeem, reward })), [familyMembers, onRedeem, reward]);

  return <FamilyMembersPoints ItemRightComponent={RedeemFamilyItemRight} members={members} />;
});
