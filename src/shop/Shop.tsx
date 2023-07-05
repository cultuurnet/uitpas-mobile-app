import React from 'react';
import { useTranslation } from 'react-i18next';

import { Analytics, EnlargedHeader, SafeAreaView } from '../_components';
import { TMainNavigationProp } from '../_routing';
import { useGetMe } from '../profile/_queries/useGetMe';
import { CategoryFilters } from './_components/categoryFilters/CategoryFilters';
import { RewardsSection, TRewardSectionProps } from './_components/rewardsSection/RewardsSection';
import { WelcomeGiftsBanner } from './_components/welcomeGiftsBanner/WelcomeGiftsBanner';
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
];

type TProps = {
  navigation: TMainNavigationProp<'Shop'>;
};

const Shop = ({ navigation }: TProps) => {
  const { t } = useTranslation();
  const { data: user } = useGetMe();

  return (
    <>
      <Analytics screenName="rewardshop" />
      <SafeAreaView edges={['left', 'right']} isScrollable>
        <EnlargedHeader height={30} />
        <Styled.SearchContainer>
          <Styled.SearchButton onPress={() => navigation.push('Search')}>
            <Styled.SearchInput editable={false} placeholder={t('SHOP.SEARCH.PLACEHOLDER')} pointerEvents="none" />
          </Styled.SearchButton>
          <Styled.SearchIcon color="primary.700" name="Search" size={18} />
        </Styled.SearchContainer>
        <>
          <WelcomeGiftsBanner />
          <CategoryFilters />
          {SECTIONS.map(({ filter, category, title, horizontal }) => (
            <RewardsSection
              category={category}
              filter={filter}
              horizontal={horizontal}
              key={title}
              title={t(title, { city: user?.address?.city || t('SHOP.SECTIONS.CITY_FALLBACK') })}
            />
          ))}
        </>
      </SafeAreaView>
    </>
  );
};

export default Shop;
