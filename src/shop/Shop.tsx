import React from 'react';
import { useTranslation } from 'react-i18next';

import { Button, Typography } from '../_components';
import { ConfigUrl } from '../_config';
import { useGetMe } from '../profile/_queries/useGetMe';
import * as Styled from './style';

const Shop = () => {
  const { t } = useTranslation();
  const { data } = useGetMe();

  const href = ConfigUrl.shop.replace(
    '{{cardSystem}}',
    encodeURIComponent(data?.cardSystemMemberships[0]?.cardSystem.name || ''),
  );

  return (
    <Styled.ContentContainer isScrollable={false}>
      <Styled.ShopImage resizeMode="contain" source={require('../_assets/images/shop.png')} />
      <Typography align="center" bottomSpacing="32px">
        {t('SHOP.DESCRIPTION')}
      </Typography>
      <Button centered href={href} inline label={t('SHOP.BUTTON')} />
    </Styled.ContentContainer>
  );
};

export default Shop;
