import { useInfiniteQuery } from '@tanstack/react-query';

import { TApiError } from '../../_http';
import { log } from '../../_utils/logger';
import { THistoryResponse } from '../_models';

export function useGetHistory() {
  const start = 0;
  let limit = 10;
  return useInfiniteQuery<THistoryResponse, TApiError>(
    ['history'],
    async ({ pageParam }) => {
      limit += pageParam;
      log.debug('start', start);
      log.debug('limit', limit);

      return Promise.resolve({
        member: historyItems.slice(0, 15),
        totalItems: 30,
      });
    },
    {
      getNextPageParam: lastPage => {
        if (limit >= lastPage?.totalItems) return undefined;
        return 10;
      },
      refetchOnMount: false,
    },
  );
}

const historyItems = [
  {
    creationDate: '2019-08-24T15:11:00Z',
    location: 'Bibliotheek Oostende',
    points: -4,
    title: 'Gratis koffie',
  },
  {
    creationDate: '2019-08-24T14:17:00Z',
    location: 'Museum Diest',
    points: 1,
    title: 'Bezoek aan de bib',
  },
  {
    creationDate: '2019-08-24T14:15:00Z',
    location: 'Bibliotheek Oostende',
    points: 3,
    title: 'Welkom bij UiTPAS',
  },
  {
    creationDate: '2019-08-24T15:11:00Z',
    location: 'Museum Diest',
    points: -4,
    title: 'Gratis koffie',
  },
  {
    creationDate: '2019-08-24T14:17:00Z',
    location: 'Museum Diest',
    points: 1,
    title: 'Bezoek aan de bib',
  },
  {
    creationDate: '2019-08-24T14:15:00Z',
    location: 'Bibliotheek Oostende',
    points: 3,
    title: 'Welkom bij UiTPAS',
  },
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
    location: 'Museum Diest',
    points: 3,
    title: 'Welkom bij UiTPAS',
  },
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
    location: 'Museum Diest',
    points: 3,
    title: 'Welkom bij UiTPAS',
  },
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
  {
    creationDate: '2019-08-24T15:11:00Z',
    location: 'Bibliotheek Oostende',
    points: -4,
    title: 'Gratis koffie',
  },
  {
    creationDate: '2019-08-24T14:17:00Z',
    location: 'Museum Diest',
    points: 1,
    title: 'Bezoek aan de bib',
  },
  {
    creationDate: '2019-08-24T14:15:00Z',
    location: 'Museum Diest',
    points: 3,
    title: 'Welkom bij UiTPAS',
  },
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
  {
    creationDate: '2019-08-24T15:11:00Z',
    location: 'Bibliotheek Oostende',
    points: -4,
    title: 'Gratis koffie',
  },
  {
    creationDate: '2019-08-24T14:17:00Z',
    location: 'Museum Diest',
    points: 1,
    title: 'Bezoek aan de bib',
  },
  {
    creationDate: '2019-08-24T14:15:00Z',
    location: 'Bibliotheek Oostende',
    points: 3,
    title: 'Welkom bij UiTPAS',
  },
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
];
