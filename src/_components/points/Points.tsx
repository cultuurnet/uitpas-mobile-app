import React from 'react'

import Icon from '../icon/Icon';
import { PointsContainer, PointsText, TPointsProps } from './style';

export const Points = ({ points, theme = 'primary' }: TPointsProps) => {
  const color = theme === 'primary' ? 'primary.800' : 'neutral.0';
  return (
    <PointsContainer $theme={theme}>
      <PointsText color={color} fontStyle='bold' size='small'>{points}</PointsText>
      <Icon color={color} name="Point" size={14} />
    </PointsContainer>
  )
}
