import React from 'react';
import { useTranslation } from 'react-i18next';

import { SafeAreaView } from '../_components';
import { CategoryFilters } from './_components/categoryFilters/CategoryFilters';
import { RewardsSection } from './_components/rewardsSection/RewardsSection';
import { WelcomeGiftsBanner } from './_components/welcomeGiftsBanner/WelcomeGiftsBanner';

const Shop = () => {
  const { t } = useTranslation();

  return (
    <SafeAreaView edges={['left', 'right']} isScrollable>
      <WelcomeGiftsBanner />
      <CategoryFilters />
      <RewardsSection filter="populair" horizontal title={t('SHOP.SECTIONS.POPULAR')} />
      <RewardsSection filter="in de kijker" title={t('SHOP.SECTIONS.HIGHLIGHTED')} />
      <RewardsSection filter="populair regio" horizontal title={t('SHOP.SECTIONS.POPULAR_REGION')} />
      <RewardsSection filter="online" title={t('SHOP.SECTIONS.ONLINE')} />
      <RewardsSection filter="sport" horizontal title={t('SHOP.SECTIONS.SPORT')} />
    </SafeAreaView>
  );
};

export default Shop;
