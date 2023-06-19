import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Switch, View } from 'react-native';

import { Button, Typography } from '../../_components';
import { theme } from '../../_styles/theme';
import * as Styled from './style';

export const SearchFilters = () => {
  const { t } = useTranslation();
  /* TODO: store this in context */
  const [isRegionFiltered, setIsRegionFiltered] = useState(false);

  return (
    <Styled.Container contentContainerStyle={{ flex: 1 }}>
      <Styled.RegionFilter>
        <Styled.RegionFilterText>
          <Typography fontStyle="bold">{t('SHOP.SEARCH.FILTERS.REGION.TITLE')}</Typography>
          <Typography>{t('SHOP.SEARCH.FILTERS.REGION.DESCRIPTION')}</Typography>
        </Styled.RegionFilterText>
        <Switch
          onValueChange={value => setIsRegionFiltered(value)}
          trackColor={{ false: theme.palette.neutral['200'], true: theme.palette.primary['600'] }}
          value={isRegionFiltered}
        />
      </Styled.RegionFilter>

      <Styled.Actions>
        <Button
          label={t('SHOP.SEARCH.FILTERS.APPLY')}
          onPress={() => {
            /* Apply filters */
          }}
        />
      </Styled.Actions>
    </Styled.Container>
  );
};
