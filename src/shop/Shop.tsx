import React, { useCallback, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { FlatList } from 'react-native';

import { Analytics, EnlargedHeader, SafeAreaView } from '../_components';
import { TMainNavigationProp } from '../_routing';
import { hasOnlySupraLocalCardSystem } from '../_utils';
import { useGetMe } from '../profile/_queries/useGetMe';
import { CategoryFilters } from './_components/categoryFilters/CategoryFilters';
import { FeaturedRewards } from './_components/featuredRewards/FeaturedRewards';
import { RewardsSection, TRewardSectionProps } from './_components/rewardsSection/RewardsSection';
import { WelcomeGiftsBanner } from './_components/welcomeGiftsBanner/WelcomeGiftsBanner';
import * as Styled from './style';

const SECTIONS: TRewardSectionProps[] = [
  { horizontal: true, section: 'online', title: 'SHOP.SECTIONS.ONLINE' },
  { horizontal: true, section: 'interessant', title: 'SHOP.SECTIONS.INTERESTING' },
  { section: 'in de kijker', title: 'SHOP.SECTIONS.HIGHLIGHTED' },
  { horizontal: true, section: 'binnenkort om te ruilen', title: 'SHOP.SECTIONS.FUTURE' },
  { category: 'laatste kans', horizontal: true, title: 'SHOP.SECTIONS.LAST_CHANCE' },
  { section: 'populair regio', title: 'SHOP.SECTIONS.POPULAR_REGION' },
  { horizontal: true, section: 'stad voordelen', title: 'SHOP.SECTIONS.CITY' },
  { section: 'populair', title: 'SHOP.SECTIONS.POPULAR' },
  { horizontal: true, section: 'sport', title: 'SHOP.SECTIONS.SPORTIVE' },
  { category: 'Goede doel', title: 'SHOP.SECTIONS.CHARITY' },
];

type TProps = {
  navigation: TMainNavigationProp<'Shop'>;
};

const Shop = ({ navigation }: TProps) => {
  const { t } = useTranslation();
  const { data: user } = useGetMe();
  const [loadedCount, setLoadedCount] = useState(2);

  const loadNextSection = useCallback(() => {
    setLoadedCount(count => count + 1);
  }, []);

  const sections = useMemo<TRewardSectionProps[]>(() => {
    // "Eropuit in andere regio's" is meaningless for passholders with only the supra-local card system.
    const allSections =
      user && hasOnlySupraLocalCardSystem(user) ? SECTIONS.filter(({ section }) => section !== 'populair') : SECTIONS;
    return allSections.slice(0, loadedCount);
  }, [user, loadedCount]);

  return (
    <>
      <Analytics screenName="rewardshop" />
      <SafeAreaView edges={['left', 'right']} isScrollable={false}>
        <FlatList
          ListHeaderComponent={
            <>
              <EnlargedHeader height={30} />
              <Styled.SearchContainer>
                <Styled.SearchButton onPress={() => navigation.push('Search')}>
                  <Styled.SearchInputContainer>
                    <Styled.SearchPlaceholderText>{t('SHOP.SEARCH.PLACEHOLDER')}</Styled.SearchPlaceholderText>
                  </Styled.SearchInputContainer>
                </Styled.SearchButton>
                <Styled.SearchIcon color="primary.700" name="Search" size={18} />
              </Styled.SearchContainer>
              <WelcomeGiftsBanner />
              <CategoryFilters />
              <FeaturedRewards />
            </>
          }
          data={sections}
          keyExtractor={({ title }) => title}
          onEndReached={loadNextSection}
          onEndReachedThreshold={0.25}
          renderItem={({ item: { section, category, title, horizontal } }) => (
            <RewardsSection
              category={category}
              horizontal={horizontal}
              loadNextSection={loadNextSection}
              section={section}
              title={t(title, { city: user?.address?.city || t('SHOP.SECTIONS.CITY_FALLBACK') })}
            />
          )}
        />
      </SafeAreaView>
    </>
  );
};

export default Shop;
