import { TReward } from '../../shop/_models/reward';

export type TRedeemInfo = {
  label?: string; // Label for the call-to-action of the redeemed reward.
  link?: string; // Link for a call-to-action for the redeemed reward
  text: string; // Text to show to the user who redeemed this reward.
};

export type TRedeemedReward = {
  id: string;
  redeemCode?: string;
  redeemDate: string;
  redeemInfo: TRedeemInfo; // Information about the redeem action.
  reward: TReward;
};

export type TRedeemedRewardsResponse = {
  member: TRedeemedReward[];
  totalItems: number;
};
