import React from 'react'
import { useNavigation } from '@react-navigation/native';

import { Typography } from '../../../_components';
import { TRootStackNavigationProp } from '../../../_routing';
import { theme } from '../../../_styles/theme';
import { TReward } from '../../../shop/_models/reward';
import * as Styled from './style';

type TProps = {
  isButton?: boolean;
  reward: TReward;
};

export const RewardCard = ({ reward, isButton }: TProps) => {
  const { navigate } = useNavigation<TRootStackNavigationProp>();
  return (
    <Styled.Container disabled={!isButton} onPress={() => navigate('ShopDetail', { id: reward.id, reward })} underlayColor={theme.palette.neutral[100]}>
      <>
        <Styled.Image hasRadius picture={reward.pictures?.[0]} />
        <Styled.TextContainer>
          <Typography fontStyle='bold'>{reward.title}</Typography>
          <Typography color='primary.800' size='small'>{reward.organizers[0]?.name}</Typography>
        </Styled.TextContainer>
        {isButton && <Styled.Arrow color="primary.800" name="ArrowRight" size="small" />}
      </>
    </Styled.Container>
  )
}
