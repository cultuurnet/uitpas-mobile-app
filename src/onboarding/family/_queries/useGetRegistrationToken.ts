import base64 from 'react-native-base64';
import { Config } from '../../../_config';
import { MutateOptions, useMutation } from '@tanstack/react-query';
import { format } from 'date-fns';

import { HttpClient, TApiError } from '../../../_http';

export type TRegistrationTokenRequest = { birthDate: Date; uitpasNumber: string };

export type TRegistrationTokenResponse = { token: string };

const getRegistrationToken = async ({
  birthDate,
  uitpasNumber,
}: TRegistrationTokenRequest): Promise<TRegistrationTokenResponse> => {
  const authorizationHeader = base64.encode(`${uitpasNumber}:${format(birthDate, 'yyyy-MM-dd')}`);

  return HttpClient.get(
    '/passholders/me/uitid/registration-token',
    {},
    { authorization: `Basic ${authorizationHeader}`, 'x-client-id': Config.REACT_NATIVE_APP_AUTH0_CLIENT_ID },
  );
};

export const useGetRegistrationToken = (
  options?: MutateOptions<TRegistrationTokenResponse, TApiError, TRegistrationTokenRequest>,
) => {
  return useMutation<TRegistrationTokenResponse, TApiError, TRegistrationTokenRequest>({
    mutationKey: ['registration-token'],
    mutationFn: getRegistrationToken,
    ...options,
  });
};
