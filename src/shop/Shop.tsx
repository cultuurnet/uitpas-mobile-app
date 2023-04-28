import React from 'react';
import { useTranslation } from 'react-i18next';

import { SafeAreaView } from '../_components';
import { CategoryFilters } from './_components/categoryFilters/CategoryFilters';
import { RewardsSection, TRewardSectionProps } from './_components/rewardsSection/RewardsSection';
import { WelcomeGiftsBanner } from './_components/welcomeGiftsBanner/WelcomeGiftsBanner';

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

const Shop = () => {
  const { t } = useTranslation();

  return (
    <SafeAreaView edges={['left', 'right']} isScrollable>
      <WelcomeGiftsBanner />
      <CategoryFilters />

      {SECTIONS.map(({ filter, category, title, horizontal }) => (
        <RewardsSection category={category} filter={filter} horizontal={horizontal} key={title} title={t(title)} />
      ))}
    </SafeAreaView>
  );
};

export default Shop;
