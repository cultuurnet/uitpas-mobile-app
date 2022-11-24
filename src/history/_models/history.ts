export type THistoryItem = {
  creationDate: string;
  location: string;
  points: number;
  title: string;
};

export type THistoryResponse = {
  member: THistoryItem[];
  totalItems: number;
};
