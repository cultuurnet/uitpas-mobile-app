import React from 'react'

import { Typography } from '../../../_components';
import { TReward } from '../../../shop/_models/reward';
import * as Styled from './style';

type TProps = {
  reward: TReward;
};

export const RewardCard = ({ reward }: TProps) => {
  return (
    <Styled.Container>
      <Styled.Image hasRadius picture={reward.pictures?.[0]} />
      <Styled.TextContainer>
        <Typography fontStyle='bold'>{reward.title}</Typography>
        <Typography color='primary.800' size='small'>{reward.organizers[0].name}</Typography>
      </Styled.TextContainer>
    </Styled.Container>
  )
}
