import { useCallback, useMemo } from 'react';
import { Config } from '../_config';
import { useInfiniteQuery, useMutation, UseMutationOptions, useQuery } from '@tanstack/react-query';

import { useAuthentication } from '../_context/AuthenticationContext';
import { HttpClient, TApiError } from '../_http';
import { Headers, Params } from '../_http/HttpClient';
import { TPaginatedResponse } from '../_models';

type TSharedOptions = { enabled?: boolean; headers?: Headers; params?: Params; onError?: (error: TApiError) => void };
type TGetOptions = TSharedOptions & Record<string, any>;

export type TPostOptions<T = unknown, RequestBody extends Record<string, unknown> = Record<string, unknown>> = Omit<
  UseMutationOptions<T, TApiError, RequestBody>,
  'queryFn' | 'mutationKey' | 'networkMode'
> & { headers?: Headers };
export type TMutationParams<RequestBody extends Record<string, unknown> = Record<string, unknown>> = {
  body?: RequestBody;
  headers?: Headers;
  path?: string;
};
type TGetInfiniteOptions = TSharedOptions & { itemsPerPage?: number; initialPageParam?: number } & Record<string, any>;

type ApiHost = 'uitpas' | 'uitdatabank';

const HOSTS: Record<ApiHost, string> = { uitdatabank: Config.API_HOST_UITDATABANK, uitpas: Config.API_HOST };

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
    <T = unknown>(queryKey: unknown[], path: string, { headers = {}, params = {}, enabled, ...options }: TGetOptions = {}) => {
      // eslint-disable-next-line react-hooks/rules-of-hooks
      return useQuery<T, TApiError>({
        queryKey: queryKey as readonly unknown[],
        queryFn: async () => HttpClient.get<T>(`${apiHost}${path}`, params, { ...defaultHeaders, ...headers }),
        enabled: !!accessToken && (enabled === undefined || enabled),
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
        ...options,
      });
    },
    [defaultHeaders, apiHost],
  );

  const deleteMutation = useCallback(
    <T = unknown, MutationParams extends TMutationParams = TMutationParams>(
      mutationKey: unknown[],
      path?: string,
      options: TPostOptions<T> = {},
    ) => {
      // eslint-disable-next-line react-hooks/rules-of-hooks
      return useMutation<T, TApiError, MutationParams>({
        mutationFn: async ({ headers, path: mutationPath }) =>
          HttpClient.delete<T>(`${apiHost}${mutationPath ?? path}`, { ...defaultHeaders, ...headers }),
        mutationKey,
        ...options,
      });
    },
    [defaultHeaders, apiHost],
  );

  const getInfinite = useCallback(
    <T extends TPaginatedResponse = TPaginatedResponse>(
      queryKey: unknown[],
      path: string,
      { headers = {}, params = {}, itemsPerPage = 10, enabled, initialPageParam = 0, ...options }: TGetInfiniteOptions = {},
    ) => {
      return useInfiniteQuery<T, TApiError>({
        queryKey: queryKey as readonly unknown[],
        queryFn: async ({ pageParam = initialPageParam }) =>
          HttpClient.get(
            `${apiHost}${path}`,
            { limit: itemsPerPage, start: Number(pageParam) * itemsPerPage, ...params },
            { ...defaultHeaders, ...headers },
          ),
        enabled: !!accessToken && (enabled === undefined || enabled),
        initialPageParam,
        getNextPageParam: (lastPage, allPages) => {
          const nextPageNumber = allPages.length;
          if (nextPageNumber * itemsPerPage >= lastPage?.totalItems) {
            return undefined;
          }

          return nextPageNumber;
        },
        ...options,
      });
    },
    [accessToken, defaultHeaders, apiHost],
  );

  return { deleteMutation, get, getInfinite, post, put };
}
