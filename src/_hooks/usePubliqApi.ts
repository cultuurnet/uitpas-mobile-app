import { useCallback } from 'react';
import { Config } from 'react-native-config';
import { InfiniteQueryObserverOptions, QueryObserverOptions, useInfiniteQuery, useQuery } from '@tanstack/react-query';

import { useAuthentication } from '../_context';
import { HttpClient, TApiError } from '../_http';
import { Headers, Params } from '../_http/HttpClient';
import { THistoryResponse } from '../history/_models';

type TSharedOptions = {
  enabled?: boolean;
  headers?: Headers;
  params?: Params;
};

type TGetOptions<T = unknown> = QueryObserverOptions<T, TApiError> & TSharedOptions;
type TGetInfiniteOptions<T = unknown> = InfiniteQueryObserverOptions<T, TApiError> & TSharedOptions & { itemsPerPage?: number };

export function usePubliqApi() {
  const { accessToken } = useAuthentication();

  const defaultHeaders: Headers = {
    Authorization: `Bearer ${accessToken}`,
  };

  const get = useCallback(
    <T = unknown>(queryKey: unknown[], path: string, { headers = {}, params = {}, enabled, ...options }: TGetOptions<T> = {}) => {
      return useQuery<T, TApiError>({
        enabled: !!accessToken && (enabled === undefined || enabled),
        networkMode: 'offlineFirst',
        queryFn: async () => HttpClient.get<T>(`${Config.API_HOST}${path}`, params, { ...defaultHeaders, ...headers }),
        queryKey,
        ...options,
      });
    },
    [Config.API_HOST, accessToken],
  );

  let pageNumber = 0;
  const getInfinite = useCallback(
    <T = unknown>(
      queryKey: unknown[],
      path: string,
      { headers = {}, params = {}, itemsPerPage = 10 }: TGetInfiniteOptions<T> = {},
    ) =>
      useInfiniteQuery<THistoryResponse, TApiError>({
        getNextPageParam: lastPage => {
          if (lastPage === null || lastPage === undefined) {
            return 0;
          }
          pageNumber += 1;
          return pageNumber * itemsPerPage >= lastPage?.totalItems ? undefined : pageNumber;
        },
        queryFn: async ({ pageParam = 0 }) => {
          return await HttpClient.get(
            `${Config.API_HOST}${path}`,
            { limit: itemsPerPage, start: pageParam * itemsPerPage, ...params },
            { ...defaultHeaders, ...headers },
          );
        },
        queryKey,
      }),
    [],
  );

  return { get, getInfinite };
}
