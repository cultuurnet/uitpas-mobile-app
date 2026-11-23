import React, { useCallback, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigation } from '@react-navigation/native';

import { TRootStackNavigationProp } from '../../_routing';
import { getRewardAccessibilityLabel } from '../../_utils';
import { TReward } from '../../shop/_models/reward';
import Points from '../points/Points';
import Typography from '../typography/Typography';
import { InAppRewardLabel } from './InAppRewardLabel';
import RewardImage from './RewardImage';
import * as Styled from './style';

type TProps = {
  isRedeemed?: boolean;
  mode: 'list' | 'tile';
  onPress?: () => void;
  reward: TReward;
  showFamilyMembers?: boolean;
  subtitle?: string;
};

const Reward = ({ reward, isRedeemed, subtitle, onPress, mode, showFamilyMembers, ...props }: TProps) => {
  const { push } = useNavigation<TRootStackNavigationProp>();
  const { t } = useTranslation();
  const isTile = mode === 'tile';
  const accessibilityLabel = useMemo(
    () => getRewardAccessibilityLabel(reward, t, { isRedeemed, subtitle }),
    [isRedeemed, reward, subtitle, t],
  );

  const onPressReward = useCallback(() => {
    if (onPress) {
      return onPress();
    } else {
      push('ShopDetail', {
        id: reward.id,
        reward,
        showFamilyMembers,
      });
    }
  }, [onPress, push, reward, showFamilyMembers]);

  const renderPointsAndLabel = useCallback(
    () =>
      (!!reward.points || reward.online) &&
      !isRedeemed && (
        <Styled.PointsAndLabelContainer>
          {!!reward.points && <Points points={reward.points} theme={isTile ? 'white' : 'primary'} />}
          {reward.online && <InAppRewardLabel />}
        </Styled.PointsAndLabelContainer>
      ),
    [isTile, reward.points, reward.online, isRedeemed],
  );

  const Container = isTile ? Styled.RewardTileContainer : Styled.RewardListContainer;
  return (
    <Container
      accessibilityLabel={accessibilityLabel}
      accessibilityRole="button"
      borderless={isTile}
      {...props}
      onPress={onPressReward}
    >
      <>
        <Styled.ImageContainer accessibilityElementsHidden importantForAccessibility="no-hide-descendants" isTile={isTile}>
          <RewardImage hasRadius={!isTile} picture={reward.pictures?.[0]}>
            {isTile && renderPointsAndLabel()}
          </RewardImage>
        </Styled.ImageContainer>
        <Styled.TextContainer accessibilityElementsHidden importantForAccessibility="no-hide-descendants" isTile={isTile}>
          <Typography fontStyle="bold" size="small">
            {reward.title}
          </Typography>
          {subtitle ? (
            <Typography size="small">{subtitle}</Typography>
          ) : reward.organizers.length === 1 ? (
            <Typography size="small">{reward.organizers[0]?.name}</Typography>
          ) : null}
          {!isTile && renderPointsAndLabel()}
        </Styled.TextContainer>
      </>
    </Container>
  );
};

export default Reward;
