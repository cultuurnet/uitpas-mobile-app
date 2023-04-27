import { useMemo } from 'react';

import { usePubliqApi } from '../../_hooks/usePubliqApi';
import { TApiError } from '../../_http';
import { Params } from '../../_http/HttpClient';
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
  organizerId,
  itemsPerPage = 20,
  params: extraParams = {},
}: {
  category?: TFilterRewardCategory;
  itemsPerPage?: number;
  organizerId?: string[];
  params?: Params;
  section?: TFilterRewardSections;
  type?: TRewardType;
} = {}) {
  const api = usePubliqApi();
  const { data: user } = useGetMe();

  const params = useMemo(() => {
    // get params, already add the default sorting
    const params: Params = {
      ['sort[redeemCount]']: 'desc',
      type,
    };

    params.owningCardSystemId = user?.cardSystemMemberships.map(membership => String(membership.cardSystem.id));

    // add category
    if (category === 'laatste kans') {
      params.lastChance = true;
    } else if (category) {
      params.categories = category;
      delete params['sort[redeemCount]'];
    }

    params.organizerId = organizerId;

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
        delete params.owningCardSystemId;
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
        delete params.owningCardSystemId;
        params.type = 'WELCOME';
        params.isRedeemableByPassholderId = user?.id;
        break;
    }
    return params;
  }, [category, section, type, user, organizerId]);

  return api.getInfinite<TRewardsResponse>(['rewards', JSON.stringify(params), itemsPerPage], `/rewards`, {
    itemsPerPage,
    onError: (_error: TApiError) => {
      // TODO: Handle error
    },
    params: { ...params, ...extraParams },
  });
}
