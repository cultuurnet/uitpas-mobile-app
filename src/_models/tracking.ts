import { TReward } from '../shop/_models/reward';

export type TRewardContext = Pick<TReward, 'id' | 'title' | 'online'> & {
  welcome: boolean;
};

export type TButtonClickEvent = {
  button_name: string;
};

export type TErrorMessageEvent = {
  message: string;
};

export type TTrackingContexts = {
  reward?: TRewardContext;
};

export type TTrackingEvents = {
  buttonClick?: TButtonClickEvent;
  errorMessage?: TErrorMessageEvent;
};
