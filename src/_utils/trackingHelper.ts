import { TTrackingData } from '../_models';
import { TFamilyMember } from '../profile/_models';
import { TReward } from '../shop/_models/reward';

export function getRewardTrackingData({ id, title, online, type }: TReward): TTrackingData['reward'] {
  return {
    id,
    online,
    title,
    welcome: type === 'WELCOME',
  };
}

export function getUpActionTrackingData(
  name: TTrackingData['up_action']['name'],
  reward: TReward,
  member: TFamilyMember,
): TTrackingData['up_action'] {
  return {
    name,
    points: reward.points,
    target: member.mainFamilyMember ? 'self' : 'family-member',
    target_ph_id: member.passholder.id,
  };
}
