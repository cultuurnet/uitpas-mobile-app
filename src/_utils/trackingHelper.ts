import { TTrackingData } from '../_models';
import { TReward } from '../shop/_models/reward';

export function getRewardTrackingData({ id, title, online, type }: TReward): TTrackingData['reward'] {
  return {
    id,
    online,
    title,
    welcome: type === 'WELCOME',
  };
}
