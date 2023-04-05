import React, { useCallback, useState } from 'react'

import { Gift } from '../../_assets/images';
import { TReward } from '../../shop/_models/reward';
import { Points } from '../points/Points';
import Typography from '../typography/Typography';
import { InAppRewardLabel } from './InAppRewardLabel';
import * as Styled from './style';

type TProps = {
  mode: 'list' | 'tile',
  onPress: () => void;
  reward: TReward;
};

const Reward = ({ reward, mode, ...props }: TProps) => {
  const [isImageError, setIsImageError] = useState(false);
  const isTile = mode === 'tile';

  const renderPointsAndLabel = useCallback(() => (
    <Styled.PointsAndLabelContainer>
      <Points points={reward.points} theme={isTile ? 'white' : 'primary'} />
      {reward.online && <InAppRewardLabel hideLabel={!isTile} />}
    </Styled.PointsAndLabelContainer>
  ), [isTile, reward.points, reward.online]);

  const Container = isTile ? Styled.RewardTileContainer : Styled.RewardListContainer;
  return (
    <Container borderless={isTile} {...props}>
      <>
        <Styled.ImageContainer isTile={isTile}>
          <Styled.Image isTile={isTile} onError={() => setIsImageError(true)} source={!isImageError && reward.pictures?.[0] ? { uri: reward.pictures[0] } : Gift} />
          {isTile && <Styled.Gradient colors={['#00000000', '#00000000', '#000000']}>
            {renderPointsAndLabel()}
          </Styled.Gradient>}
        </Styled.ImageContainer>
        <Styled.textContainer isTile={isTile}>
          <Typography fontStyle='bold' size='small'>{reward.title}</Typography>
          <Typography size='small'>{reward.organizers[0].name}</Typography>
          {!isTile && renderPointsAndLabel()}
        </Styled.textContainer>
      </>
    </Container>
  );
}

export default Reward;