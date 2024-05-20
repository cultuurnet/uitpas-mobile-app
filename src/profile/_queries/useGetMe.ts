import { useState } from 'react';

import { useStackNavigation } from '../../_hooks';
import { usePubliqApi } from '../../_hooks/usePubliqApi';
import { HttpStatus, TApiError } from '../../_http';
import { TPassHolder } from '../_models';

export function useGetMe(enabled?: boolean) {
  const api = usePubliqApi();
  const navigation = useStackNavigation();
  const [retryCount, setRetryCount] = useState(0);

  return api.get<TPassHolder>(['me'], '/passholders/me', {
    enabled,
    onError: (error: TApiError) => {
      if (error.status === HttpStatus.NotFound) {
        navigation.navigate('ProfileNotFound');
      }
    },
    retry: (_, error) => {
      if (error.status === HttpStatus.NotFound) {
        return false;
      }

      setRetryCount(retryCount + 1);
      return retryCount < 6;
    },
  });
}
