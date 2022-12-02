import { useCallback } from 'react';
import { Config } from 'react-native-config';
import {
  InfiniteQueryObserverOptions,
  useInfiniteQuery,
  useMutation,
  UseMutationOptions,
  useQuery,
  UseQueryOptions,
} from '@tanstack/react-query';

import { useAuthentication } from '../_context';
import { HttpClient, TApiError } from '../_http';
import { Headers, Params } from '../_http/HttpClient';
import { TPaginatedResponse } from '../_models';

type TSharedOptions = {
  enabled?: boolean;
  headers?: Headers;
  params?: Params;
};
type TGetOptions<T = unknown> = Omit<UseQueryOptions<T, TApiError>, 'networkMode' | 'queryFn' | 'queryKey'> & TSharedOptions;

type TPostOptions<T = unknown, RequestBody extends Record<string, unknown> = Record<string, unknown>> = Omit<
  UseMutationOptions<T, TApiError, RequestBody>,
  'queryFn' | 'mutationKey' | 'networkMode'
> & {
  headers?: Headers;
};
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

  const post = useCallback(
    <T = unknown, RequestBody extends Record<string, unknown> = Record<string, unknown>>(
      mutationKey: unknown[],
      path: string,
      { headers = {}, ...options }: TPostOptions<T> = {},
    ) => {
      return useMutation<T, TApiError, RequestBody>({
        mutationFn: async (body: Record<string, unknown>) =>
          HttpClient.post<T>(`${Config.API_HOST}${path}`, body, { ...defaultHeaders, ...headers }),
        mutationKey,
        networkMode: 'offlineFirst',
        ...options,
      });
    },
    [Config.API_HOST, accessToken],
  );

  const getInfinite = useCallback(
    <T extends TPaginatedResponse = TPaginatedResponse>(
      queryKey: unknown[],
      path: string,
      { headers = {}, params = {}, itemsPerPage = 10, enabled, ...options }: TGetInfiniteOptions<T> = {},
    ) =>
      useInfiniteQuery<T, TApiError>({
        enabled: !!accessToken && (enabled === undefined || enabled),
        getNextPageParam: (lastPage, allPages) => {
          const nextPageNumber = allPages.length;
          if (nextPageNumber * itemsPerPage >= lastPage?.totalItems) {
            return undefined;
          }

          return nextPageNumber;
        },
        networkMode: 'offlineFirst',
        queryFn: async ({ pageParam = 0 }) =>
          HttpClient.get(
            `${Config.API_HOST}${path}`,
            { limit: itemsPerPage, start: pageParam * itemsPerPage, ...params },
            { ...defaultHeaders, ...headers },
          ),
        queryKey,
        ...options,
      }),
    [],
  );

  return { get, getInfinite, post };
}
