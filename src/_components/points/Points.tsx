import React from 'react'

import { ThemeColor } from '../../_styles/theme';
import Icon from '../icon/Icon';
import * as Styled from './style';

export const Points = ({ points, theme = 'primary' }: Styled.TPointsProps) => {
  const color: ThemeColor = theme === 'primary' ? 'primary.800' : 'neutral.0';
  return (
    <Styled.PointsContainer $theme={theme}>
      <Styled.PointsText color={color} fontStyle='bold' size='small'>{points}</Styled.PointsText>
      <Icon color={color} name="Point" size={14} />
    </Styled.PointsContainer>
  )
}
