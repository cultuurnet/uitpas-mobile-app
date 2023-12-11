import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

import { ParentChild } from '../../../../_assets/images';
import { Typography } from '../../../../_components';
import * as Styled from './style';

export const OtherFamiliesBanner = () => {
  const { t } = useTranslation();

  const [containerHeight, setContainerHeight] = useState(0);

  return (
    <>
      <Styled.Container onLayout={event => setContainerHeight(event.nativeEvent.layout.height)}>
        <Styled.Image parentHeight={containerHeight} source={ParentChild} />
        <Typography color="neutral.0" fontStyle="bold">
          {t('ONBOARDING.FAMILY.MY_FAMILIES.BANNER_TITLE')}
        </Typography>
        <Typography color="neutral.0" size="small">
          {'\n'}
          {t('ONBOARDING.FAMILY.MY_FAMILIES.BANNER_DESCRIPTION')}
        </Typography>
      </Styled.Container>
      <Styled.BottomGap />
    </>
  );
};
