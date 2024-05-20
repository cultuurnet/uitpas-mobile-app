export type TRedeemReason =
  | 'INVALID_CARD' // the given uitpasNumber is not valid.
  | 'PASSHOLDER_VOLUME' // maximum number of times this reward can be redeemed per passholder has been reached.
  | 'PASSHOLDER_POINTS' // passholder does not have enough points to redeem this reward.
  | 'REWARD_PERIOD' // the current date is outside the redeemPeriod of this reward
  | 'REWARD_VOLUME' // maximum number of times this reward can be redeemed (in general) has been reached.
  | 'PASSHOLDER_APPLICABLE_CARDSYSTEMS' // the passholder is not a member of one of the applicable card systems of this reward.
  | 'PASSHOLDER_NO_ACTIVE_CARDSYSTEMS'; // the passholder is not active or has no active card system memberships

export type TRedeemStatus = {
  message: string;
  reason: TRedeemReason;
  redeemable: boolean;
};
