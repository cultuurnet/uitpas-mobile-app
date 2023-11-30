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

export type TPostOptions<T = unknown, RequestBody extends Record<string, unknown> = Record<string, unknown>> = Omit<
  UseMutationOptions<T, TApiError, RequestBody>,
  'queryFn' | 'mutationKey' | 'networkMode'
> & {
  headers?: Headers;
};
export type TMutationParams<RequestBody extends Record<string, unknown> = Record<string, unknown>> = {
  body?: RequestBody;
  headers?: Headers;
  path?: string;
};
type TGetInfiniteOptions<T = unknown> = InfiniteQueryObserverOptions<T, TApiError> & TSharedOptions & { itemsPerPage?: number };

type ApiHost = 'uitpas' | 'uitdatabank';

const HOSTS: Record<ApiHost, string> = {
  uitdatabank: Config.API_HOST_UITDATABANK,
  uitpas: Config.API_HOST,
};

export function usePubliqApi(host: ApiHost = 'uitpas') {
  const { accessToken } = useAuthentication();

  const apiHost = HOSTS[host];

  const defaultHeaders: Headers = useMemo(() => {
    const headers: Headers = {};
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
    <T = unknown, MutationParams extends TMutationParams = TMutationParams>(
      mutationKey: unknown[],
      path?: string,
      options: TPostOptions<T> = {},
    ) => {
      // eslint-disable-next-line react-hooks/rules-of-hooks
      return useMutation<T, TApiError, MutationParams>({
        mutationFn: async ({ body, headers, path: mutationPath }) =>
          HttpClient.post<T>(`${apiHost}${mutationPath ?? path}`, body, { ...defaultHeaders, ...headers }),
        mutationKey,
        networkMode: 'offlineFirst',
        ...options,
      });
    },
    [defaultHeaders, apiHost],
  );

  const put = useCallback(
    <T = unknown, MutationParams extends TMutationParams = TMutationParams>(
      mutationKey: unknown[],
      path: string,
      options: TPostOptions<T> = {},
    ) => {
      // eslint-disable-next-line react-hooks/rules-of-hooks
      return useMutation<T, TApiError, MutationParams>({
        mutationFn: async ({ body, headers }) => HttpClient.put<T>(`${apiHost}${path}`, body, { ...defaultHeaders, ...headers }),
        mutationKey,
        networkMode: 'offlineFirst',
        ...options,
      });
    },
    [defaultHeaders, apiHost],
  );

  const deleteMutation = useCallback(
    <T = unknown, MutationParams extends TMutationParams = TMutationParams>(
      mutationKey: unknown[],
      path: string,
      options: TPostOptions<T> = {},
    ) => {
      // eslint-disable-next-line react-hooks/rules-of-hooks
      return useMutation<T, TApiError, MutationParams>({
        mutationFn: async ({ headers }) => HttpClient.delete<T>(`${apiHost}${path}`, { ...defaultHeaders, ...headers }),
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

  return { deleteMutation, get, getInfinite, post, put };
}
