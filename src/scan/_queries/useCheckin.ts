import { usePubliqApi } from '../../_hooks/usePubliqApi';
import { TCheckInRequest, TCheckInResponse } from '../_models';

export function useCheckin() {
  const api = usePubliqApi();
  return api.post<TCheckInResponse, TCheckInRequest>(['checkin'], '/passholders/me/checkins');
}
