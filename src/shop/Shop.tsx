import React from 'react';
import { useTranslation } from 'react-i18next';

import { SafeAreaView } from '../_components';
import { CategoryFilters } from './_components/categoryFilters/CategoryFilters';
import { RewardsSection, TRewardSectionProps } from './_components/rewardsSection/RewardsSection';

const SECTIONS: TRewardSectionProps[] = [
  { filter: 'online', title: 'SHOP.SECTIONS.ONLINE' },
  { filter: 'in de kijker', title: 'SHOP.SECTIONS.HIGHLIGHTED' },
  { category: 'laatste kans', title: 'SHOP.SECTIONS.LAST_CHANCE' },
  { filter: 'populair regio', title: 'SHOP.SECTIONS.POPULAR_REGION' },
  { filter: 'stad voordelen', title: 'SHOP.SECTIONS.CITY' },
  { filter: 'populair', title: 'SHOP.SECTIONS.POPULAR' },
  { filter: 'sport', title: 'SHOP.SECTIONS.SPORTIVE' },
  { category: 'Goede doel', title: 'SHOP.SECTIONS.CHARITY' },
]

const Shop = () => {
  const { t } = useTranslation();

  return (
    <SafeAreaView edges={['left', 'right']} isScrollable>
      <CategoryFilters />

      {SECTIONS.map(({ filter, category, title }, index) => (
        <RewardsSection category={category} filter={filter} horizontal={index % 2 === 0} key={title} title={t(title)} />
      ))}
    </SafeAreaView>
  );
};

export default Shop;
