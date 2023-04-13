import { useMemo } from 'react';

import { usePubliqApi } from '../../_hooks/usePubliqApi';
import { TApiError } from '../../_http';
import { useGetMe } from '../../profile/_queries/useGetMe';
import { TRewardCategory, TRewardsResponse, TRewardType } from '../_models/reward';

export type TFilterRewardCategory = TRewardCategory | 'laatste kans';
export type TFilterRewardSections =
  | 'online'
  | 'in de kijker'
  | 'populair regio'
  | 'populair'
  | 'stad voordelen'
  | 'sport'
  | 'welkom';

export function useGetRewards({
  category,
  type = 'POINTS',
  section,
  itemsPerPage = 20,
  params: extraParams = {},
}: {
  category?: TFilterRewardCategory;
  itemsPerPage?: number;
  params?: Record<string, string | boolean | number>;
  section?: TFilterRewardSections;
  type?: TRewardType;
} = {}) {
  const api = usePubliqApi();
  const { data: user } = useGetMe();

  const [params, owningCardSystemIdParam] = useMemo(() => {
    // get params, already add the default sorting
    const params: Record<string, string | boolean | number> = {
      ['sort[redeemCount]']: 'desc',
      type,
    };

    let owningCardSystemIdParam = user?.cardSystemMemberships
      ? `?${user.cardSystemMemberships.map(membership => `owningCardSystemId=${membership.cardSystem.id}`).join('&')}`
      : '';

    // add category
    if (category === 'laatste kans') {
      params.lastChance = true;
    } else if (category) {
      params.categories = category;
      delete params['sort[redeemCount]'];
    }

    // filter for a section
    switch (section) {
      case 'online':
        params.online = true;
        delete params['sort[redeemCount]'];
        break;
      case 'in de kijker':
        params.featured = true;
        break;
      case 'populair':
        owningCardSystemIdParam = '';
        break;
      case 'populair regio':
        // No extra params needed
        break;
      case 'stad voordelen':
        params.organizerPostalCode = user?.address?.postalCode;
        break;
      case 'sport':
        params.sport = true;
        break;
      case 'welkom':
        owningCardSystemIdParam = '';
        params.type = 'WELCOME';
        params.isRedeemableByPassholderId = user.id;
        break;
    }
    return [params, owningCardSystemIdParam];
  }, [category, section, type, user]);

  return api.getInfinite<TRewardsResponse>(
    ['rewards', JSON.stringify(params), owningCardSystemIdParam, itemsPerPage],
    `/rewards${owningCardSystemIdParam}`,
    {
      itemsPerPage,
      onError: (_error: TApiError) => {
        // TODO: Handle error
      },
      params: { ...params, ...extraParams },
    },
  );
}
