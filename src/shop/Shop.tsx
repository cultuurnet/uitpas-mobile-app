import React, { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { URL } from 'react-native-url-polyfill';

import { Shop as ShopImage } from '../_assets/images';
import { Button, Typography } from '../_components';
import { ConfigUrl } from '../_config';
import { useGetMe } from '../profile/_queries/useGetMe';
import { useGetRewards } from './_queries/useGetRewards';
import * as Styled from './style';

const Shop = () => {
  const { t } = useTranslation();
  const { data } = useGetMe();
  const { data: rewards } = useGetRewards({ section: 'populair' });

  const href = useMemo(() => {
    const url = new URL(ConfigUrl.shop);

    data.cardSystemMemberships
      .filter(card => card.status === 'ACTIVE' && card.uitpasNumber)
      .forEach((membership, index) => {
        url.searchParams.append(`cardSystemsFilter[${index}]`, membership.cardSystem.name);
      });

    return url.toString();
  }, [data.cardSystemMemberships]);

  return (
    <Styled.ContentContainer isScrollable={false}>
      <Styled.ShopImage resizeMode="contain" source={ShopImage} />
      <Typography align="center" bottomSpacing="32px">
        {t('SHOP.DESCRIPTION')}
      </Typography>
      <Button centered href={href} inline label={t('SHOP.BUTTON')} />
    </Styled.ContentContainer>
  );
};

export default Shop;
