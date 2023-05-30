import React, { useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { EnlargedHeader, Reward, SafeAreaView, Typography } from '../_components';
import { TMainNavigationProp } from '../_routing';
import { useGetMe } from '../profile/_queries/useGetMe';
import { CategoryFilters } from './_components/categoryFilters/CategoryFilters';
import { RewardsSectionLoader } from './_components/rewardsSection/RewardSection.loading';
import { RewardsSection, TRewardSectionProps } from './_components/rewardsSection/RewardsSection';
import { WelcomeGiftsBanner } from './_components/welcomeGiftsBanner/WelcomeGiftsBanner';
import { useGetRewards } from './_queries/useGetRewards';
import * as Styled from './style';

const SECTIONS: TRewardSectionProps[] = [
  { filter: 'online', horizontal: true, title: 'SHOP.SECTIONS.ONLINE' },
  { filter: 'interessant', horizontal: true, title: 'SHOP.SECTIONS.INTERESTING' },
  { filter: 'in de kijker', title: 'SHOP.SECTIONS.HIGHLIGHTED' },
  { category: 'laatste kans', horizontal: true, title: 'SHOP.SECTIONS.LAST_CHANCE' },
  { filter: 'populair regio', title: 'SHOP.SECTIONS.POPULAR_REGION' },
  { filter: 'stad voordelen', horizontal: true, title: 'SHOP.SECTIONS.CITY' },
  { filter: 'populair', title: 'SHOP.SECTIONS.POPULAR' },
  { filter: 'sport', horizontal: true, title: 'SHOP.SECTIONS.SPORTIVE' },
  { category: 'Goede doel', title: 'SHOP.SECTIONS.CHARITY' },
]

type TProps = {
  navigation: TMainNavigationProp<'Shop'>;
}

const Shop = ({ navigation }: TProps) => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [search, setSearch] = useState('');
  const { top } = useSafeAreaInsets();
  const { t } = useTranslation();
  const { data: user } = useGetMe();

  const { data: searchResults, isLoading: isSearchLoading } = useGetRewards({ enabled: search.length > 0, freeText: search });
  const results = searchResults?.pages?.flatMap(({ member }) => member) ?? [];

  const onFocus = useCallback(() => {
    navigation.getParent().setOptions({ headerShown: false })
    setIsSearchOpen(true);
  }, [navigation]);

  const onBlur = useCallback(() => {
    navigation.getParent().setOptions({ headerShown: true })
    setIsSearchOpen(false);
  }, [navigation]);

  const stickyHeaderIndices = isSearchOpen ? [1] : [];


  /* TODO: 
   * - Move everything of search into a seperate component
   * - Check if we can use a flashlist instead of scrollview
   * - Check if performance is better when we put search into seperate screen instead of this screen with a boolean
   * - Check styling on Android
   * - Better loading indicator
   * - Check search results, because lazy loading doesn't seem to work
   * 
   * */
  return (
    <SafeAreaView edges={['left', 'right']} isScrollable stickyHeaderIndices={stickyHeaderIndices}>
      <EnlargedHeader height={30} />
      <Styled.SearchContainer paddingTop={isSearchOpen ? top : 0}>
        <Styled.SearchInput
          blurOnSubmit
          onBlur={onBlur}
          onChangeText={setSearch}
          onFocus={onFocus}
          placeholder={t('SHOP.SEARCH.PLACEHOLDER')}
          value={search}
        />
        <Styled.SearchIcon color='primary.700' name="Search" size={18} />
      </Styled.SearchContainer>
      {isSearchOpen ?
        <Styled.SearchResulstsContainer>
          {search.length > 0 ?
            (isSearchLoading ? (
              <RewardsSectionLoader />
            ) : (
              results.length > 0 ?
                results.map(reward => <Reward key={reward.id} mode='list' reward={reward} />)
                : <Typography>Geen resultaten gevonden</Typography>
            ))
            : (
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
            )
          }
        </Styled.SearchResulstsContainer>
        :
        <>
          <WelcomeGiftsBanner />
          <CategoryFilters />

          {SECTIONS.map(({ filter, category, title, horizontal }) => (
            <RewardsSection category={category} filter={filter} horizontal={horizontal} key={title} title={t(title, { city: user?.address?.city || t('SHOP.SECTIONS.CITY_FALLBACK') })} />
          ))}
        </>
      }
    </SafeAreaView>
  );
};

export default Shop;
