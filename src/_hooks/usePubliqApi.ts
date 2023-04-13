import { useCallback, useMemo } from 'react';
import { Config } from 'react-native-config';
import {
  InfiniteQueryObserverOptions,
  useInfiniteQuery,
  useMutation,
  UseMutationOptions,
  useQuery,
  UseQueryOptions,
} from '@tanstack/react-query';

import { useAuthentication } from '../_context/AuthenticationContext';
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

type ApiHost = 'uitpas' | 'uitdatabank';

export function usePubliqApi(host: ApiHost = 'uitpas') {
  const { accessToken } = useAuthentication();

  const apiHost = host === 'uitdatabank' ? Config.API_HOST_UITDATABANK : Config.API_HOST;

  const defaultHeaders: Headers = useMemo(() => {
    const headers = {};
    // Uitdatabank doesn't require an access token
    if (host !== 'uitdatabank') {
      headers.Authorization = `Bearer ${accessToken}`;
    }
    return headers;
  }, [accessToken, host]);

  const get = useCallback(
    <T = unknown>(queryKey: unknown[], path: string, { headers = {}, params = {}, enabled, ...options }: TGetOptions<T> = {}) => {
      // eslint-disable-next-line react-hooks/rules-of-hooks
      return useQuery<T, TApiError>({
        enabled: !!accessToken && (enabled === undefined || enabled),
        networkMode: 'offlineFirst',
        queryFn: async () => HttpClient.get<T>(`${apiHost}${path}`, params, { ...defaultHeaders, ...headers }),
        queryKey,
        ...options,
      });
    },
    [accessToken, defaultHeaders, apiHost],
  );

  const post = useCallback(
    <T = unknown, RequestBody extends Record<string, unknown> = Record<string, unknown>>(
      mutationKey: unknown[],
      path: string,
      { headers = {}, ...options }: TPostOptions<T> = {},
    ) => {
      // eslint-disable-next-line react-hooks/rules-of-hooks
      return useMutation<T, TApiError, RequestBody>({
        mutationFn: async (body: Record<string, unknown>) =>
          HttpClient.post<T>(`${apiHost}${path}`, body, { ...defaultHeaders, ...headers }),
        mutationKey,
        networkMode: 'offlineFirst',
        ...options,
      });
    },
    [defaultHeaders, apiHost],
  );

  const getInfinite = useCallback(
    <T extends TPaginatedResponse = TPaginatedResponse>(
      queryKey: unknown[],
      path: string,
      { headers = {}, params = {}, itemsPerPage = 10, enabled, ...options }: TGetInfiniteOptions<T> = {},
    ) => {
      // eslint-disable-next-line react-hooks/rules-of-hooks
      return useInfiniteQuery<T, TApiError>({
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
            `${apiHost}${path}`,
            { limit: itemsPerPage, start: pageParam * itemsPerPage, ...params },
            { ...defaultHeaders, ...headers },
          ),
        queryKey,
        ...options,
      });
    },
    [accessToken, defaultHeaders, apiHost],
  );

  return { get, getInfinite, post };
}
