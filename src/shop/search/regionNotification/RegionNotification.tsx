import React, { FC, useMemo } from 'react';
import { useTranslation } from 'react-i18next';

import { Trans, Typography } from '../../../_components';
import { getPassHolderRegions } from '../../../_utils';
import { useGetMe } from '../../../profile/_queries/useGetMe';
import { TSearchFilters } from '../../_models/searchFilters';
import { useGetRewards } from '../../_queries/useGetRewards';
import * as Styled from './style';

type TProps = {
  filters: TSearchFilters;
  onPress: () => void;
  search: string;
  searchAmount: number;
};

export const RegionNotification: FC<TProps> = ({ onPress, filters, search, searchAmount }) => {
  const { data: searchOutOfRegionResults } = useGetRewards({
    enabled: !filters.includeAllCardSystems && search.length > 0,
    filters: { ...filters, includeAllCardSystems: true },
    freeText: search,
  });
  const { t } = useTranslation();
  const { data: passHolder } = useGetMe();

  const regions = getPassHolderRegions(passHolder);
  const calculatedAmount = useMemo(
    () =>
      searchOutOfRegionResults?.pages?.[0]?.totalItems > 0 ? searchOutOfRegionResults?.pages?.[0]?.totalItems - searchAmount : 0,
    [searchOutOfRegionResults, searchAmount],
  );

  if (calculatedAmount === 0) return null;
  return (
    <Styled.NotificationContainer>
      <Trans
        align="center"
        i18nKey={`SHOP.SEARCH.REGION_HINT${searchAmount === 0 ? '_EMPTY' : ''}`}
        parent={Typography}
        size="small"
        values={{ count: calculatedAmount, regions: regions?.map(card => card.cardSystem.name).join(', ') }}
      />

      <Styled.Cta onPress={onPress}>
        <Styled.Link align="center" fontStyle="bold">
          {t('SHOP.SEARCH.REGION_HINT_CTA')}
        </Styled.Link>
      </Styled.Cta>
    </Styled.NotificationContainer>
  );
};
