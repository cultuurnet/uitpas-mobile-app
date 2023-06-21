import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Switch } from 'react-native';

import { Button, Typography } from '../../_components';
import { TRootStackNavigationProp, TRootStackRouteProp } from '../../_routing';
import { theme } from '../../_styles/theme';
import * as Styled from './style';

type TProps = {
  navigation: TRootStackNavigationProp<'SearchFilters'>;
  route: TRootStackRouteProp<'SearchFilters'>;
};

export const SearchFilters = ({ navigation, route }: TProps) => {
  const { t } = useTranslation();
  const { filters } = route.params;
  const [updatedFilters, setUpdatedFilters] = useState(filters);

  function onSubmit() {
    navigation.navigate('Search', { filters: updatedFilters });
  }

  return (
    <Styled.Container contentContainerStyle={{ flex: 1 }}>
      <Styled.RegionFilter>
        <Styled.RegionFilterText>
          <Typography fontStyle="bold">{t('SHOP.SEARCH.FILTERS.REGION.TITLE')}</Typography>
          <Typography>{t('SHOP.SEARCH.FILTERS.REGION.DESCRIPTION')}</Typography>
        </Styled.RegionFilterText>
        <Switch
          onValueChange={value => setUpdatedFilters({ ...updatedFilters, includeAllCardSystems: value })}
          trackColor={{ false: theme.palette.neutral['200'], true: theme.palette.primary['600'] }}
          value={updatedFilters['includeAllCardSystems']}
        />
      </Styled.RegionFilter>

      <Styled.Actions>
        <Button label={t('SHOP.SEARCH.FILTERS.APPLY')} onPress={onSubmit} />
      </Styled.Actions>
    </Styled.Container>
  );
};
