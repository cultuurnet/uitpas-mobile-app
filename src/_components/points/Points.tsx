import React from 'react'

import Icon from '../icon/Icon';
import * as Styled from './style';

const Points = ({ points, theme = 'primary', large }: Styled.TPointsProps) => {
  const color = Styled.PointsColor[theme];

  return (
    <Styled.PointsContainer $theme={theme}>
      <Styled.PointsText color={color} fontStyle='bold' size={large ? 'large' : 'small'}>{points}</Styled.PointsText>
      <Icon color={color} name="Point" size={large ? 18 : 14} />
    </Styled.PointsContainer>
  )
}

export default Points;