export type HttpMetadataPagingResponse = {
  count: number;
  skip: number;
  totalCount: number;
};

export enum HttpSortDirection {
  Ascending = 'ASC',
  Descending = 'DESC',
}

export type HttpPagedResponse<T> = {
  data: T[];
  meta: HttpMetadataPagingResponse;
};

export type HttpMetadataQuery = {
  search?: string;
  skip?: number;
  sortBy?: string;
  sortDirection?: HttpSortDirection;
  take?: number;
};

export type FillMetadataQueryFunction = (partialQuery: HttpMetadataQuery) => void;
