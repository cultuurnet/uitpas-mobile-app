import { useInfiniteQuery } from '@tanstack/react-query';

import { TApiError } from '../../_http';
import { THistoryItem } from '../_models';

export function useGetHistory() {
  return useInfiniteQuery<THistoryItem[], TApiError>(['history'], () => [
    {
      creationDate: '2019-08-24T15:11:00Z',
      location: 'Bibliotheek Oostende',
      points: -4,
      title: 'Gratis koffie',
    },
    {
      creationDate: '2019-08-24T14:17:00Z',
      location: 'Bibliotheek Oostende',
      points: 1,
      title: 'Bezoek aan de bib',
    },
    {
      creationDate: '2019-08-24T14:15:00Z',
      location: 'Bibliotheek Oostende',
      points: 3,
      title: 'Welkom bij UiTPAS',
    },
  ]);
}
