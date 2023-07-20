import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Switch } from 'react-native';

import { Button, Typography } from '../../_components';
import { TRootStackNavigationProp, TRootStackRouteProp } from '../../_routing';
import { theme } from '../../_styles/theme';
import { getPassHolderRegions } from '../../_utils';
import { useGetMe } from '../../profile/_queries/useGetMe';
import { TFilterRewardSorting } from '../_queries/useGetRewards';
import * as Styled from './style';

type TProps = {
  navigation: TRootStackNavigationProp<'SearchFilters'>;
  route: TRootStackRouteProp<'SearchFilters'>;
};

const SORT_FILTERS: TFilterRewardSorting[] = ['-redeemCount', '-creationDate', 'points', '-points'];

export const SearchFilters = ({ navigation, route }: TProps) => {
  const { t } = useTranslation();
  const { filters, sort = '-redeemCount' } = route.params;
  const [updatedFilters, setUpdatedFilters] = useState({ filters, sort });
  const { data: passHolder } = useGetMe();
  const regions = getPassHolderRegions(passHolder);

  function onSubmit() {
    navigation.navigate('Search', updatedFilters);
  }

  return (
    <Styled.Container contentContainerStyle={{ flexGrow: 1 }}>
      <Styled.RegionFilter>
        <Styled.RegionFilterText>
          <Typography fontStyle="bold">{t('SHOP.SEARCH.FILTERS.REGION.TITLE')}</Typography>
          <Typography>
            {t('SHOP.SEARCH.FILTERS.REGION.DESCRIPTION', { regions: regions.map(card => card.cardSystem.name).join(', ') })}
          </Typography>
        </Styled.RegionFilterText>
        <Switch
          onValueChange={value => setUpdatedFilters({ ...updatedFilters, filters: { ...filters, includeAllCardSystems: value } })}
          trackColor={{ false: theme.palette.neutral['200'], true: theme.palette.primary['600'] }}
          value={updatedFilters.filters['includeAllCardSystems']}
        />
      </Styled.RegionFilter>

      {SORT_FILTERS.map(sortFilter => (
        <Styled.FilterCheckbox
          isChecked={updatedFilters.sort === sortFilter}
          key={sortFilter}
          label={<Typography>Meest omgeruild</Typography>}
          onChange={() => setUpdatedFilters({ ...updatedFilters, sort: sortFilter })}
          position="right"
        />
      ))}

      <Styled.Actions>
        <Button label={t('SHOP.SEARCH.FILTERS.APPLY')} onPress={onSubmit} />
      </Styled.Actions>
    </Styled.Container>
  );
};
