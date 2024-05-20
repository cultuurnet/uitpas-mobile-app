import { useCallback, useEffect, useState } from 'react';
import { UseInfiniteQueryResult } from '@tanstack/react-query';

import { FillMetadataQueryFunction, HttpMetadataQuery, HttpPagedResponse, TApiError } from '../_http';

export function useInfiniteScroll<T>(
  fetchItems: (query?: HttpMetadataQuery) => UseInfiniteQueryResult<HttpPagedResponse<T>, TApiError>,
) {
  const [previousItemsQuery, setPreviousItemsQuery] = useState<HttpMetadataQuery>({});
  const [itemsQuery, setItemsQuery] = useState<HttpMetadataQuery>({});
  const { data, isLoading, fetchNextPage, refetch, hasNextPage } = fetchItems(itemsQuery);

  const allItems: T[] = data?.pages.reduce((items, page) => [...items, ...page.data], []);

  const setQuery: FillMetadataQueryFunction = (partialQuery: HttpMetadataQuery) => {
    setItemsQuery(value => ({ ...value, ...partialQuery }));
  };

  const refetchItems = useCallback(() => {
    if (itemsQuery?.search === previousItemsQuery?.search) {
      if (hasNextPage) {
        fetchNextPage();
      } else {
        refetch();
      }
    } else {
      refetch();
    }
  }, [fetchNextPage, hasNextPage, itemsQuery, previousItemsQuery, refetch]);

  const getMoreData = useCallback(() => {
    if (hasNextPage) {
      fetchNextPage();
    }
  }, [fetchNextPage, hasNextPage]);

  useEffect(() => {
    refetchItems();
    setPreviousItemsQuery(itemsQuery);
  }, [itemsQuery, refetchItems]);

  return { getMoreData, isLoading, items: allItems, query: itemsQuery, refetchItems, setQuery };
}
