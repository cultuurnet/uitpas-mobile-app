import React from 'react';
import { useTranslation } from 'react-i18next';
import { Shop as ShopImage } from '../_assets/images';
import { Button, Typography } from '../_components';
import { ConfigUrl } from '../_config';
import { useGetMe } from '../profile/_queries/useGetMe';
import * as Styled from './style';

const Shop = () => {
  const { t } = useTranslation();

  return (
    <SafeAreaView isScrollable>
      <RewardsSection filter="populair" horizontal title={t('SHOP.SECTIONS.POPULAR')} />
      <RewardsSection filter="in de kijker" title={t('SHOP.SECTIONS.HIGHLIGHTED')} />
      <RewardsSection filter="populair regio" horizontal title={t('SHOP.SECTIONS.POPULAR_REGION')} />
      <RewardsSection filter="online" title={t('SHOP.SECTIONS.ONLINE')} />
      <RewardsSection filter="sport" horizontal title={t('SHOP.SECTIONS.SPORT')} />
    </SafeAreaView>
  );
};

export default Shop;
