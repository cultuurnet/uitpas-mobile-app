import { TReward } from '../shop/_models/reward';

export type TRewardTrackingData = Pick<TReward, 'id' | 'title' | 'online'> & {
  welcome: boolean;
};
