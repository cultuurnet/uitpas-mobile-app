import React from 'react'

import Icon from '../icon/Icon';
import * as Styled from './style';

export const Points = ({ points, theme = 'primary' }: Styled.TPointsProps) => {
  const color = Styled.PointsColor[theme];

  return (
    <Styled.PointsContainer $theme={theme}>
      <Styled.PointsText color={color} fontStyle='bold' size='small'>{points}</Styled.PointsText>
      <Icon color={color} name="Point" size={14} />
    </Styled.PointsContainer>
  )
}
