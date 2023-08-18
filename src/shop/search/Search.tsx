import React, { useCallback, useMemo, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Keyboard } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { FlashList } from '@shopify/flash-list';

import { EnlargedHeader, PillButton, Reward, SafeAreaView, Typography } from '../../_components';
import { TRootStackNavigationProp, TRootStackRouteProp } from '../../_routing';
import { useGetMe } from '../../profile/_queries/useGetMe';
import { RewardsSectionLoader } from '../_components/rewardsSection/RewardSection.loading';
import { useGetRewards } from '../_queries/useGetRewards';
import { initialFilters } from '../config';
import { RegionNotification } from './regionNotification/RegionNotification';
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

export const Search = ({ navigation, route }: TProps) => {
  const [search, setSearch] = useState('');
  const { top } = useSafeAreaInsets();
  const { t } = useTranslation();
  const { data: user } = useGetMe();
  const { filters = initialFilters, sort = '-redeemCount' } = route.params || {};
  const {
    data: searchResults,
    isLoading: isSearchLoading,
    fetchNextPage,
  } = useGetRewards({
    enabled: search.length > 0,
    filters,
    freeText: search,
    sort,
  });
  const results = useMemo(() => searchResults?.pages?.flatMap(({ member }) => member) ?? [], [searchResults]);

  const ref = useRef<ScrollView>(null);

  const onClose = useCallback(() => {
    setSearch('');
    navigation.pop();
  }, [navigation]);

  function onSearch(keyword: string) {
    Keyboard.dismiss();
    setSearch(keyword);
  }

  function onSearchOutsideRegion() {
    ref.current?.scrollTo({ animated: false, y: 0 });
    navigation.navigate('Search', { filters: { ...filters, includeAllCardSystems: true } });
  }

  const appliedFiltersAmount = useMemo(
    () =>
      Object.keys(filters).reduce((count, filterKey) => {
        if (filters[filterKey] === initialFilters[filterKey]) {
          return count;
        }
        if (!filters[filterKey]) return count;
        if (filterKey === 'categories') return count + filters[filterKey].length;
        return count + 1;
      }, 0),
    [filters],
  );

  return (
    <SafeAreaView edges={['left', 'right']} isScrollable keyboardShouldPersistTaps="handled" ref={ref} stickyHeaderIndices={[1]}>
      <EnlargedHeader height={30} />
      <Styled.SearchContainer paddingTop={top}>
        <Styled.SearchInput autoFocus numberOfLines={1} onChangeText={setSearch} returnKeyType="search" value={search} />
        <Styled.BackIcon borderless color="primary.700" name="ChevronLeft" onPress={onClose} size={24} />
        {search.length > 0 && (
          <Styled.ResetIcon borderless color="primary.700" name="Close" onPress={() => setSearch('')} size={14} />
        )}
      </Styled.SearchContainer>

      <Styled.SearchResultsContainer>
        {search.length > 0 ? (
          isSearchLoading ? (
            <RewardsSectionLoader showHeader={false} />
          ) : (
            <>
              <Styled.SearchFilters>
                <PillButton
                  amount={appliedFiltersAmount + (sort !== '-redeemCount' ? 1 : 0)}
                  icon="Filter"
                  label={t('SHOP.SEARCH.FILTERS.CTA')}
                  onPress={() => navigation.push('SearchFilters', { filters, sort })}
                />
              </Styled.SearchFilters>
              <FlashList
                ItemSeparatorComponent={() => <Styled.RewardSeparator />}
                ListEmptyComponent={
                  <Styled.NoContentText align="center" size="small">
                    {t('SHOP.SEARCH.NO_RESULTS')}
                  </Styled.NoContentText>
                }
                data={results}
                estimatedItemSize={117}
                keyExtractor={item => item.id}
                keyboardShouldPersistTaps="handled"
                onEndReached={!isSearchLoading ? fetchNextPage : null}
                onEndReachedThreshold={0.1}
                renderItem={({ item }) => <Reward mode="list" reward={item} />}
              />
              {!filters.includeAllCardSystems && (
                <RegionNotification
                  filters={filters}
                  onPress={onSearchOutsideRegion}
                  search={search}
                  searchAmount={searchResults?.pages?.[0]?.totalItems}
                />
              )}
            </>
          )
        ) : (
          <>
            <Styled.PopularItem key={`search-${user.address.city}`} onPress={() => onSearch(user.address.city)}>
              <Styled.PopularItemIcon name="Popular" size={20} />
              <Typography color="primary.800">{user.address.city}</Typography>
            </Styled.PopularItem>
            <Styled.Separator />
            {SEARCH_TERMS.map(({ keyword, label }) => (
              <>
                <Styled.PopularItem key={`search-${keyword}`} onPress={() => onSearch(keyword)}>
                  <Styled.PopularItemIcon name="Popular" size={20} />
                  <Typography color="primary.800">{t(label)}</Typography>
                </Styled.PopularItem>
                <Styled.Separator />
              </>
            ))}
          </>
        )}
      </Styled.SearchResultsContainer>
    </SafeAreaView>
  );
};
