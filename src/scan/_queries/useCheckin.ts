import { TMutationParams, usePubliqApi } from '../../_hooks/usePubliqApi';
import { useGetMe } from '../../profile/_queries/useGetMe';
import { TCheckInRequest, TCheckInResponse } from '../_models';

export function useCheckin() {
  const api = usePubliqApi();
  const { data: me } = useGetMe();

  return api.post<TCheckInResponse, TMutationParams<TCheckInRequest>>(['checkin'], `/passholders/${me.id}/checkins`);
}
