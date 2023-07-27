import React, { useCallback, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { FlashList } from '@shopify/flash-list';

import { EnlargedHeader, PillButton, Reward, SafeAreaView, Typography } from '../../_components';
import { TRootStackNavigationProp, TRootStackRouteProp } from '../../_routing';
import { useGetMe } from '../../profile/_queries/useGetMe';
import { RewardsSectionLoader } from '../_components/rewardsSection/RewardSection.loading';
import { TSearchFilters } from '../_models/searchFilters';
import { useGetRewards } from '../_queries/useGetRewards';
import * as Styled from './style';

type SearchTerm = {
  keyword: string;
  label: string;
};
const SEARCH_TERMS: SearchTerm[] = [
  { keyword: 'Zwembeurt', label: 'SHOP.SEARCH.SEARCH_TERMS.SWIMMING' },
  { keyword: 'Koffie', label: 'SHOP.SEARCH.SEARCH_TERMS.COFFEE' },
  { keyword: 'Boek', label: 'SHOP.SEARCH.SEARCH_TERMS.BOOK' },
  { keyword: 'Film', label: 'SHOP.SEARCH.SEARCH_TERMS.MOVIE' },
];

type TProps = {
  navigation: TRootStackNavigationProp<'Search'>;
  route: TRootStackRouteProp<'Search'>;
};

const initialFilters: TSearchFilters = {
  includeAllCardSystems: false,
};

export const Search = ({ navigation, route }: TProps) => {
  const [search, setSearch] = useState('');
  const { top } = useSafeAreaInsets();
  const { t } = useTranslation();
  const { data: user } = useGetMe();
  const { filters = initialFilters } = route.params || {};

  const { data: searchResults, isLoading: isSearchLoading } = useGetRewards({
    enabled: search.length > 0,
    filters,
    freeText: search,
  });
  const results = useMemo(() => searchResults?.pages?.flatMap(({ member }) => member) ?? [], [searchResults]);

  const onClose = useCallback(() => {
    setSearch('');
    navigation.pop();
  }, [navigation]);

  const appliedFiltersAmount = useMemo(
    () =>
      Object.keys(filters).reduce((count, filterKey) => {
        if (filters[filterKey] === initialFilters[filterKey]) {
          return count;
        }

        return count + 1;
      }, 0),
    [filters],
  );

  return (
    <SafeAreaView edges={['left', 'right']} isScrollable keyboardShouldPersistTaps="handled" stickyHeaderIndices={[1]}>
      <EnlargedHeader height={30} />
      <Styled.SearchContainer paddingTop={top}>
        <Styled.SearchInput autoFocus numberOfLines={1} onChangeText={setSearch} returnKeyType="search" value={search} />
        <Styled.BackIcon borderless color="primary.700" name="ChevronLeft" onPress={onClose} size={24} />
        {search.length > 0 && (
          <Styled.ResetIcon borderless color="primary.700" name="Close" onPress={() => setSearch('')} size={14} />
        )}
      </Styled.SearchContainer>

      <Styled.SearchResulstsContainer>
        {search.length > 0 ? (
          isSearchLoading ? (
            <RewardsSectionLoader showHeader={false} />
          ) : (
            <>
              <Styled.SearchFilters>
                <PillButton
                  amount={appliedFiltersAmount}
                  icon="Filter"
                  label={t('SHOP.SEARCH.FILTERS.CTA')}
                  onPress={() => navigation.push('SearchFilters', { filters })}
                />
              </Styled.SearchFilters>
              <FlashList
                ItemSeparatorComponent={() => <Styled.RewardSeparator />}
                ListEmptyComponent={<Styled.NoContentText align="center">{t('SHOP.NO_RESULTS')}</Styled.NoContentText>}
                data={results}
                estimatedItemSize={117}
                keyExtractor={item => item.id}
                keyboardShouldPersistTaps="handled"
                renderItem={({ item }) => <Reward mode="list" reward={item} />}
              />
            </>
          )
        ) : (
          <>
            <Styled.PopularItem key={`search-${user.address.city}`} onPress={() => setSearch(user.address.city)}>
              <Styled.PopularItemIcon name="Popular" size={20} />
              <Typography color="primary.800">{user.address.city}</Typography>
            </Styled.PopularItem>
            <Styled.Separator />
            {SEARCH_TERMS.map(({ keyword, label }) => (
              <>
                <Styled.PopularItem key={`search-${keyword}`} onPress={() => setSearch(keyword)}>
                  <Styled.PopularItemIcon name="Popular" size={20} />
                  <Typography color="primary.800">{t(label)}</Typography>
                </Styled.PopularItem>
                <Styled.Separator />
              </>
            ))}
          </>
        )}
      </Styled.SearchResulstsContainer>
    </SafeAreaView>
  );
};
