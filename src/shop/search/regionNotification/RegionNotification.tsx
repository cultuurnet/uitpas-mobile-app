import React, { FC, useMemo } from 'react';
import { ScrollView } from 'react-native';

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
  const { data: passHolder } = useGetMe();

  const regions = getPassHolderRegions(passHolder);
  const calculatedAmount = useMemo(
    () =>
      searchOutOfRegionResults?.pages?.[0]?.totalItems > 2 ? searchOutOfRegionResults?.pages?.[0]?.totalItems - searchAmount : 0,
    [searchOutOfRegionResults, searchAmount],
  );

  if (calculatedAmount === 0) return null;
  return (
    <>
      <ScrollView>
        <Styled.NotificationContainer>
          <Trans
            i18nKey={`SHOP.SEARCH.REGION_HINT${searchAmount === 0 ? '_EMPTY' : ''}`}
            onButtonPress={onPress}
            parent={Typography}
            size="small"
            values={{ amount: calculatedAmount, regions: regions?.map(card => card.cardSystem.name).join(', ') }}
          />
        </Styled.NotificationContainer>
      </ScrollView>
    </>
  );
};
