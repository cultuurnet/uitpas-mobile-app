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
      <RewardsSection filter="online" horizontal title={t('SHOP.SECTIONS.ONLINE')} />
      <RewardsSection filter="in de kijker" title={t('SHOP.SECTIONS.HIGHLIGHTED')} />
      <RewardsSection category="laatste kans" horizontal title={t('SHOP.SECTIONS.LAST_CHANCE')} />
      <RewardsSection filter="populair regio" title={t('SHOP.SECTIONS.POPULAR_REGION')} />
      <RewardsSection filter="stad voordelen" horizontal title={t('SHOP.SECTIONS.CITY')} />
      <RewardsSection filter="populair" title={t('SHOP.SECTIONS.POPULAR')} />
      <RewardsSection filter="sport" horizontal title={t('SHOP.SECTIONS.SPORTIVE')} />
      <RewardsSection category="Goede doel" title={t('SHOP.SECTIONS.CHARITY')} />
    </SafeAreaView>
  );
};

export default Shop;
