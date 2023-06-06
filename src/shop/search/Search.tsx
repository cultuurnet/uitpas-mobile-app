import React, { useCallback, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { FlashList } from '@shopify/flash-list';

import { EnlargedHeader, Reward, SafeAreaView, Typography } from '../../_components';
import { TRootStackNavigationProp } from '../../_routing';
import { useGetMe } from '../../profile/_queries/useGetMe';
import { RewardsSectionLoader } from '../_components/rewardsSection/RewardSection.loading';
import { useGetRewards } from '../_queries/useGetRewards';
import * as Styled from './style';

type TProps = {
  navigation: TRootStackNavigationProp<'Search'>;
};

export const Search = ({ navigation }: TProps) => {
  const [search, setSearch] = useState('');
  const { top } = useSafeAreaInsets();
  const { t } = useTranslation();
  const { data: user } = useGetMe();

  const { data: searchResults, isLoading: isSearchLoading } = useGetRewards({ enabled: search.length > 0, freeText: search });
  const results = useMemo(() => searchResults?.pages?.flatMap(({ member }) => member) ?? [], [searchResults]);

  const onClose = useCallback(() => {
    setSearch('');
    navigation.pop();
  }, [navigation]);

  const backIcon = useMemo(
    () => <Styled.BackIcon color="primary.700" name="ChevronLeft" onPress={onClose} size={22} />,
    [onClose],
  );

  return (
    <SafeAreaView edges={['left', 'right']} isScrollable stickyHeaderIndices={[1]}>
      <EnlargedHeader height={30} />
      <Styled.SearchContainer paddingTop={top}>
        <Styled.SearchInput autoFocus onChangeText={setSearch} placeholder={t('SHOP.SEARCH.PLACEHOLDER')} value={search} />
        {backIcon}
      </Styled.SearchContainer>

      <Styled.SearchResulstsContainer>
        {search.length > 0 ? (
          isSearchLoading ? (
            <RewardsSectionLoader showHeader={false} />
          ) : (
            <FlashList
              ItemSeparatorComponent={() => <Styled.RewardSeparator />}
              ListEmptyComponent={<Styled.NoContentText align="center">{t('SHOP.NO_RESULTS')}</Styled.NoContentText>}
              data={results}
              estimatedItemSize={117}
              keyExtractor={item => item.id}
              renderItem={({ item }) => <Reward mode="list" reward={item} />}
            />
          )
        ) : (
          <>
            <Styled.PopularItem onPress={() => setSearch(user.address.city)}>
              <Styled.PopularItemIcon name="Popular" size={20} />
              <Typography color="primary.800">{user.address.city}</Typography>
            </Styled.PopularItem>
            <Styled.Separator />
            <Styled.PopularItem onPress={() => setSearch('Zwembeurt')}>
              <Styled.PopularItemIcon name="Popular" size={20} />
              <Typography color="primary.800">{t('SHOP.SEARCH.SEARCH_TERMS.SWIMMING')}</Typography>
            </Styled.PopularItem>
            <Styled.Separator />
            <Styled.PopularItem onPress={() => setSearch('Koffie')}>
              <Styled.PopularItemIcon name="Popular" size={20} />
              <Typography color="primary.800">{t('SHOP.SEARCH.SEARCH_TERMS.COFFEE')}</Typography>
            </Styled.PopularItem>
            <Styled.Separator />
            <Styled.PopularItem onPress={() => setSearch('Boek')}>
              <Styled.PopularItemIcon name="Popular" size={20} />
              <Typography color="primary.800">{t('SHOP.SEARCH.SEARCH_TERMS.BOOK')}</Typography>
            </Styled.PopularItem>
            <Styled.Separator />
            <Styled.PopularItem onPress={() => setSearch('Film')}>
              <Styled.PopularItemIcon name="Popular" size={20} />
              <Typography color="primary.800">{t('SHOP.SEARCH.SEARCH_TERMS.MOVIE')}</Typography>
            </Styled.PopularItem>
          </>
        )}
      </Styled.SearchResulstsContainer>
    </SafeAreaView>
  );
};
