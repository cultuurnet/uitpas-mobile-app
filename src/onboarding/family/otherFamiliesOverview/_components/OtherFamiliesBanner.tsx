import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

import { ParentChild } from '../../../../_assets/images';
import { Typography } from '../../../../_components';
import { useGetMyFamilies } from '../../_queries';
import * as Styled from './style';

export const OtherFamiliesBanner = () => {
  const { t } = useTranslation();

  const [containerHeight, setContainerHeight] = useState(0);
  const { data: families = [] } = useGetMyFamilies();

  return (
    <>
      <Styled.Container onLayout={event => setContainerHeight(event.nativeEvent.layout.height)}>
        <Styled.Image parentHeight={containerHeight} source={ParentChild} />
        <Typography color="neutral.0" fontStyle="bold">
          {t('ONBOARDING.FAMILY.OTHER_FAMILIES.BANNER_TITLE')}
        </Typography>
        <Typography color="neutral.0" size="small">
          {'\n'}
          {t('ONBOARDING.FAMILY.OTHER_FAMILIES.BANNER_DESCRIPTION')}
        </Typography>
      </Styled.Container>
      {families.length > 0 && <Styled.BottomGap />}
    </>
  );
};
