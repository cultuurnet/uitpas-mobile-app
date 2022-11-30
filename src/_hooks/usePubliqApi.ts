import { useCallback } from 'react';
import { Config } from 'react-native-config';
import { useMutation, UseMutationOptions, useQuery, UseQueryOptions } from '@tanstack/react-query';

import { useAuthentication } from '../_context';
import { HttpClient, TApiError } from '../_http';
import { Headers, Params } from '../_http/HttpClient';

type TGetOptions<T = unknown> = Omit<UseQueryOptions<T, TApiError>, 'networkMode' | 'queryFn' | 'queryKey'> & {
  enabled?: boolean;
  headers?: Headers;
  params?: Params;
};

type TPostOptions<T = unknown, RequestBody extends Record<string, unknown> = Record<string, unknown>> = Omit<
  UseMutationOptions<T, TApiError, RequestBody>,
  'queryFn' | 'mutationKey' | 'networkMode'
> & {
  headers?: Headers;
};

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

  return { get, post };
}
