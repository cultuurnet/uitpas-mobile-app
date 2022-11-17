import { useCallback } from 'react';
import { Config } from 'react-native-config';
import { QueryObserverOptions, useQuery } from '@tanstack/react-query';

import { useAuthentication } from '../_context';
import { HttpClient, TApiError } from '../_http';
import { Headers, Params } from '../_http/HttpClient';

type TGetOptions = {
  enabled?: boolean;
  headers?: Headers;
  onError?: QueryObserverOptions['onError'];
  onSuccess?: QueryObserverOptions['onSuccess'];
  params?: Params;
};

export function usePubliqApi() {
  const { accessToken } = useAuthentication();

  const defaultHeaders: Headers = {
    Authorization: `Bearer ${accessToken}`,
  };

  const get = useCallback(
    <T>(queryKey: unknown[], path: string, { headers = {}, params = {}, ...options }: TGetOptions = {}) => {
      return useQuery<T, TApiError>({
        enabled: !!accessToken && (options.enabled === undefined || options.enabled),
        onError: options.onError,
        onSuccess: options.onSuccess,
        queryFn: async () => HttpClient.get<T>(`${Config.API_HOST}${path}`, params, { ...defaultHeaders, ...headers }),
        queryKey,
      });
    },
    [Config.API_HOST, accessToken],
  );

  return { get };
}
