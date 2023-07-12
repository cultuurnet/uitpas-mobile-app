import { TReward } from '../shop/_models/reward';

export type TRewardTrackingData = Pick<TReward, 'id' | 'title' | 'online'> & {
  welcome: boolean;
};

export type TButtonClickEvent = {
  button_name: string;
};

export type TErrorMessageEvent = {
  message: string;
};

export type TTrackingData = {
  reward?: TRewardTrackingData;
};

export type TTrackingEvents = {
  buttonClick?: TButtonClickEvent;
  errorMessage?: TErrorMessageEvent;
};
