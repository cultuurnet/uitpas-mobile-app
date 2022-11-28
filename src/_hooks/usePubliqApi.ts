import { useCallback } from 'react';
import { Config } from 'react-native-config';
import { QueryObserverOptions, useQuery } from '@tanstack/react-query';

import { useAuthentication } from '../_context';
import { HttpClient, TApiError } from '../_http';
import { Headers, Params } from '../_http/HttpClient';

type TGetOptions<T = unknown> = QueryObserverOptions<T, TApiError> & {
  enabled?: boolean;
  headers?: Headers;
  params?: Params;
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

  return { get };
}
