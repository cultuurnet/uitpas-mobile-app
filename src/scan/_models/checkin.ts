export type TCheckInRequest = {
  /** Check-in code of the event */
  checkinCode: string;
};

export type TCheckInResponse = {
  /** Newly added points as a result of this check-in */
  addedPoints: number;
  /** Total points of the passholder after this check-in */
  totalPoints: number;
};
