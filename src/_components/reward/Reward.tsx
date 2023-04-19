import React, { useCallback } from 'react'
import { useNavigation } from '@react-navigation/native';

import { TRootStackNavigationProp } from '../../_routing';
import { TReward } from '../../shop/_models/reward';
import Points from '../points/Points';
import Typography from '../typography/Typography';
import { InAppRewardLabel } from './InAppRewardLabel';
import RewardImage from './RewardImage';
import * as Styled from './style';

type TProps = {
  isRedeemed?: boolean;
  mode: 'list' | 'tile',
  reward: TReward;
  subtitle?: string;
};

const Reward = ({ reward, isRedeemed, subtitle, mode, ...props }: TProps) => {
  const { push } = useNavigation<TRootStackNavigationProp>();
  const isTile = mode === 'tile';

  const onPress = useCallback(() => {
    push('ShopDetail', {
      id: reward.id,
      reward,
    });
  }, [reward, push]);

  const renderPointsAndLabel = useCallback(() => (
    (!!reward.points || reward.online) && !isRedeemed && (
      <Styled.PointsAndLabelContainer>
        {!!reward.points && <Points points={reward.points} theme={isTile ? 'white' : 'primary'} />}
        {reward.online && <InAppRewardLabel hideLabel={isTile} />}
      </Styled.PointsAndLabelContainer>
    )), [isTile, reward.points, reward.online, isRedeemed]);

  const Container = isTile ? Styled.RewardTileContainer : Styled.RewardListContainer;
  return (
    <Container borderless={isTile} {...props} onPress={onPress}>
      <>
        <Styled.ImageContainer isTile={isTile}>
          <RewardImage hasRadius={!isTile} picture={reward.pictures?.[0]}>
            {isTile && renderPointsAndLabel()}
          </RewardImage>
        </Styled.ImageContainer>
        <Styled.textContainer isTile={isTile}>
          <Typography fontStyle='bold' size='small'>{reward.title}</Typography>
          <Typography size='small'>{subtitle || reward.organizers[0].name}</Typography>
          {!isTile && renderPointsAndLabel()}
        </Styled.textContainer>
      </>
    </Container>
  );
}

export default Reward;