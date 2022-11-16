import { useStackNavigation } from '../../_hooks';
import { usePubliqApi } from '../../_hooks/usePubliqApi';
import { HttpStatus, TApiError } from '../../_http';
import { TPassHolder } from '../_models';

export function useGetMe() {
  const api = usePubliqApi();
  const navigation = useStackNavigation();

  return api.get<TPassHolder>(['me'], '/passholders/me', {
    onError: (error: TApiError) => {
      if (error.status === HttpStatus.NotFound) {
        navigation.navigate('ProfileNotFound');
      }
    },
  });
}
