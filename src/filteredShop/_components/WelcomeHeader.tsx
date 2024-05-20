import React from 'react';
import { useTranslation } from 'react-i18next';

import { GiftHalf } from '../../_assets/images';
import { Typography } from '../../_components';
import * as Styled from './style';

export const WelcomeHeader = () => {
  const { t } = useTranslation();

  return (
    <Styled.Container>
      <Styled.Gift source={GiftHalf} />
      <Typography color="neutral.0" fontStyle="bold">
        {t('SHOP.WELCOME.BANNER_TITLE')}
      </Typography>
    </Styled.Container>
  );
};
