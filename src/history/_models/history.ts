import { TPaginatedResponse } from '../../_models';

export type THistoryItem = {
  creationDate: string;
  location: string;
  points: number;
  title: string;
};

export type THistoryResponse = TPaginatedResponse<THistoryItem>;
