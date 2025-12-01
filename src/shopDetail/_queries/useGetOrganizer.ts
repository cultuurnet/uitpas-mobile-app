import { Config } from '../../_config';
import { usePubliqApi } from '../../_hooks/usePubliqApi';
import { TOrganizer } from '../_models/organizer';

export function useGetOrganizer({ id }: { id: string }) {
  const api = usePubliqApi('uitdatabank');

  return api.get<TOrganizer>(['organizer', id], `/organizers/${id}?clientId=${Config.REACT_NATIVE_APP_AUTH_CLIENT_ID}`, {
    enabled: !!id,
  });
}
