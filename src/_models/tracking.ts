import { TReward } from '../shop/_models/reward';

export type TRewardContext = Pick<TReward, 'id' | 'title' | 'online'> & {
  welcome: boolean;
};
