import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Switch } from 'react-native';

import { Button, Typography } from '../../_components';
import { TRootStackNavigationProp, TRootStackRouteProp } from '../../_routing';
import { theme } from '../../_styles/theme';
import { getPassHolderRegions } from '../../_utils';
import { useGetMe } from '../../profile/_queries/useGetMe';
import { TRewardCategory } from '../_models/reward';
import { TSearchFilters } from '../_models/searchFilters';
import { TFilterRewardSorting } from '../_queries/useGetRewards';
import * as Styled from './style';

type TProps = {
  navigation: TRootStackNavigationProp<'SearchFilters'>;
  route: TRootStackRouteProp<'SearchFilters'>;
};

type TFilter<T> = {
  filter: T;
  title: string;
};

const SORT_FILTERS: TFilter<TFilterRewardSorting>[] = [
  { filter: '-redeemCount', title: 'Meest omgeruild' },
  { filter: '-creationDate', title: 'Meest recent toegevoegd' },
  { filter: 'points', title: 'Punten laag - hoog' },
  { filter: '-points', title: 'Punten hoog - laag' },
];
const CATEGORY_FILTER: TFilter<TRewardCategory>[] = [
  { filter: 'Doen', title: 'Doen' },
  { filter: 'Goede doel', title: 'Goede doel' },
  { filter: 'Gadget of item', title: 'Gadgets' },
  { filter: 'Eten en drinken', title: 'Eten & drinkens' },
];
const SECTION_FILTER: TFilter<keyof Pick<TSearchFilters, 'online' | 'forKids' | 'sport'>>[] = [
  { filter: 'online', title: 'In de app om te ruilen' },
  { filter: 'forKids', title: 'Leuk voor kinderen' },
  { filter: 'sport', title: 'Sportieve voordelen' },
];

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
    <Styled.Container>
      <Styled.RegionFilter>
        <Styled.RegionFilterText>
          <Typography color="primary.800" fontStyle="bold" size="large">
            {t('SHOP.SEARCH.FILTERS.REGION.TITLE')}
          </Typography>
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
      <Styled.SectionTitle color="primary.800" fontStyle="bold" size="large">
        Sorteren op
      </Styled.SectionTitle>
      {SORT_FILTERS.map(sortFilter => (
        <Styled.FilterCheckbox
          isChecked={updatedFilters.sort === sortFilter.filter}
          key={sortFilter.filter}
          label={<Typography>{sortFilter.title}</Typography>}
          onChange={() => setUpdatedFilters({ ...updatedFilters, sort: sortFilter.filter })}
          position="right"
          type="Radio"
        />
      ))}
      <Styled.SectionTitle color="primary.800" fontStyle="bold" size="large">
        Type voordelen
      </Styled.SectionTitle>
      {CATEGORY_FILTER.map(categoryFilter => (
        <Styled.FilterCheckbox
          isChecked={updatedFilters.filters.categories?.includes(categoryFilter.filter)}
          key={categoryFilter.filter}
          label={<Typography>{categoryFilter.title}</Typography>}
          onChange={value =>
            setUpdatedFilters({
              ...updatedFilters,
              filters: {
                ...updatedFilters.filters,
                categories: value
                  ? [...(updatedFilters.filters.categories || []), categoryFilter.filter]
                  : updatedFilters.filters.categories.filter(category => category !== categoryFilter.filter),
              },
            })
          }
          position="right"
        />
      ))}
      <Styled.SectionTitle color="primary.800" fontStyle="bold" size="large">
        Toon enkel
      </Styled.SectionTitle>
      {SECTION_FILTER.map(sectionFilter => (
        <Styled.FilterCheckbox
          isChecked={updatedFilters.filters[sectionFilter.filter]}
          key={sectionFilter.filter}
          label={<Typography>{sectionFilter.filter}</Typography>}
          onChange={value =>
            setUpdatedFilters({
              ...updatedFilters,
              filters: {
                ...updatedFilters.filters,
                [sectionFilter.filter]: value,
              },
            })
          }
          position="right"
        />
      ))}
      <Styled.Actions>
        <Button label={t('SHOP.SEARCH.FILTERS.APPLY')} onPress={onSubmit} />
      </Styled.Actions>
    </Styled.Container>
  );
};
