import { Config } from '../../_config';

import { usePubliqApi } from '../../_hooks/usePubliqApi';
import { TApiError } from '../../_http';
import { TOrganizer } from '../_models/organizer';

export function useGetOrganizer({ id }: { id: string }) {
  const api = usePubliqApi('uitdatabank');

  return api.get<TOrganizer>(['organizer', id], `/organizers/${id}?clientId=${Config.REACT_NATIVE_APP_AUTH0_CLIENT_ID}`, {
    enabled: !!id,
    onError: (_error: TApiError) => {
      // TODO: Handle error
    },
  });
}
