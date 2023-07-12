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

export type TSuccessMessageEvent = {
  message: string;
};

export type TLinkClickEvent = {
  targetUrl: string;
};

export type TSwimlaneInteractionEvent = {
  action: 'click' | 'swipe' | 'click-view-more';
  algo: {
    name: 'default';
    version: '0';
  };
  'swimlane-direction': 'vertical' | 'horizontal';
  'swimlane-title': string;
};

export type TTrackingData = {
  reward?: TRewardTrackingData;
};

export type TTrackingEvents = {
  buttonClick?: TButtonClickEvent;
  errorMessage?: TErrorMessageEvent;
  linkClick?: TLinkClickEvent;
  successMessage?: TSuccessMessageEvent;
  swimlaneInteraction?: TSwimlaneInteractionEvent;
};
