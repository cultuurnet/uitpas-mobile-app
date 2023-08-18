import { useMemo } from 'react';

import { usePubliqApi } from '../../_hooks/usePubliqApi';
import { Params } from '../../_http/HttpClient';
import { useGetMe } from '../../profile/_queries/useGetMe';
import { TRewardsResponse } from '../_models/reward';
import { TSearchFilters } from '../_models/searchFilters';

export type TFilterRewardSorting =
  | '-redeemCount'
  | 'redeemCount'
  | 'creationDate'
  | '-creationDate'
  | 'name'
  | '-name'
  | 'points'
  | '-points';

export type TGetRewardsParams = {
  enabled?: boolean;
  filters?: TSearchFilters;
  freeText?: string;
  itemsPerPage?: number;
  organizerId?: string[];
  params?: Params;
  sort?: TFilterRewardSorting;
};

export function useGetRewards({
  organizerId,
  freeText,
  itemsPerPage = 20,
  enabled = true,
  params: extraParams = {},
  filters = {
    includeAllCardSystems: false,
  },
  sort = '-redeemCount',
}: TGetRewardsParams = {}) {
  const api = usePubliqApi();
  const { data: user } = useGetMe();

  const params = useMemo(() => {
    const { withoutSorting } = filters;
    // get params, already add the default sorting
    const params: Params = {
      ...filters,
      organizerId,
      sort,
    };

    // applying specific filters
    if (filters !== undefined) {
      const { includeAllCardSystems, isInterestingForPassholderId, organizerPostalCode } = filters;
      if (isInterestingForPassholderId) params.isInterestingForPassholderId = user?.id;
      if (!includeAllCardSystems)
        params.owningCardSystemId = user?.cardSystemMemberships.map(membership => String(membership.cardSystem.id));
      if (organizerPostalCode) params.organizerPostalCode = user?.address?.postalCode;
      if (withoutSorting) delete params.sort;
    }

    if (freeText) {
      params.text = `${freeText}*`;
    }

    return params;
  }, [user, organizerId, freeText, filters, sort]);
  return api.getInfinite<TRewardsResponse>(['rewards', JSON.stringify(params), itemsPerPage], `/rewards`, {
    enabled,
    itemsPerPage,
    params: { ...params, ...extraParams },
  });
}
