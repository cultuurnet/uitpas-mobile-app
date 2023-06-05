import React, { useCallback, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { EnlargedHeader, Reward, SafeAreaView, Typography } from '../_components';
import { TRootStackNavigationProp } from '../_routing';
import { useGetMe } from '../profile/_queries/useGetMe';
import { RewardsSectionLoader } from './_components/rewardsSection/RewardSection.loading';
import { useGetRewards } from './_queries/useGetRewards';
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

  const rewards = useMemo(() => results.map(reward => <Reward key={reward.id} mode="list" reward={reward} />), [results]);
  const backIcon = useMemo(
    () => <Styled.BackIcon color="primary.700" name="ChevronLeft" onPress={onClose} size={22} />,
    [onClose],
  );

  /* TODO:
   * - Check if we can use a flashlist instead of scrollview
   * - Check styling on Android
   * - Better loading indicator
   *
   * */
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
            <RewardsSectionLoader />
          ) : results.length > 0 ? (
            rewards
          ) : (
            <Typography>Geen resultaten gevonden</Typography>
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
              <Typography color="primary.800">Zwembeurt</Typography>
            </Styled.PopularItem>
            <Styled.Separator />
            <Styled.PopularItem onPress={() => setSearch('Koffie')}>
              <Styled.PopularItemIcon name="Popular" size={20} />
              <Typography color="primary.800">Koffie</Typography>
            </Styled.PopularItem>
            <Styled.Separator />
            <Styled.PopularItem onPress={() => setSearch('Boek')}>
              <Styled.PopularItemIcon name="Popular" size={20} />
              <Typography color="primary.800">Boek</Typography>
            </Styled.PopularItem>
            <Styled.Separator />
            <Styled.PopularItem onPress={() => setSearch('Film')}>
              <Styled.PopularItemIcon name="Popular" size={20} />
              <Typography color="primary.800">Film</Typography>
            </Styled.PopularItem>
          </>
        )}
      </Styled.SearchResulstsContainer>
    </SafeAreaView>
  );
};
