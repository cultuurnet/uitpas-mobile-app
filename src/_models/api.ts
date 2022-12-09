export type TPaginatedResponse<ItemType = unknown> = {
  member: ItemType[];
  totalItems: number;
};
