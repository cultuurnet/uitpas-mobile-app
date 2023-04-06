import React from 'react';
import { useTranslation } from 'react-i18next';

import { SafeAreaView } from '../_components';
import { CategoryFilters } from './_components/categoryFilters/CategoryFilters';
import { RewardsSection } from './_components/rewardsSection/RewardsSection';

const Shop = () => {
  const { t } = useTranslation();

  return (
    <SafeAreaView edges={['left', 'right']} isScrollable>
      <CategoryFilters />
      <RewardsSection filter="online" title={t('SHOP.SECTIONS.ONLINE')} />
      <RewardsSection filter="in de kijker" horizontal title={t('SHOP.SECTIONS.HIGHLIGHTED')} />
      <RewardsSection category="laatste kans" title={t('SHOP.SECTIONS.LAST_CHANCE')} />
      <RewardsSection filter="populair regio" horizontal title={t('SHOP.SECTIONS.POPULAR_REGION')} />
      <RewardsSection filter="stad voordelen" title={t('SHOP.SECTIONS.CITY')} />
      <RewardsSection filter="populair" horizontal title={t('SHOP.SECTIONS.POPULAR')} />
      <RewardsSection filter="sport" title={t('SHOP.SECTIONS.SPORTIVE')} />
      <RewardsSection category="Goede doel" horizontal title={t('SHOP.SECTIONS.CHARITY')} />
    </SafeAreaView>
  );
};

export default Shop;
