import React from 'react';
import { useTranslation } from 'react-i18next';

import Icon from '../icon/Icon';
import * as Styled from './style';

const Points = ({ points, theme = 'primary', large }: Styled.TPointsProps) => {
  const { t } = useTranslation();
  const color = Styled.PointsColor[theme];

  return (
    <Styled.PointsContainer $theme={theme} accessibilityLabel={t('GENERAL.POINTS', { count: points })} accessible>
      <Styled.PointsText color={color} fontStyle="bold" size={large ? 'large' : 'small'}>
        {points}
      </Styled.PointsText>
      <Icon color={color} name="Point" size={large ? 18 : 14} />
    </Styled.PointsContainer>
  );
};

export default Points;
