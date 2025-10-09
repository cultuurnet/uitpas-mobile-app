import React, { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigation } from '@react-navigation/native';

import { Star } from '../../../_assets/images';
import Points from '../../../_components/points/Points';
import { InAppRewardLabel } from '../../../_components/reward/InAppRewardLabel';
import RewardImage from '../../../_components/reward/RewardImage';
import Typography from '../../../_components/typography/Typography';
import { TRootStackNavigationProp } from '../../../_routing';
import { TReward } from '../../_models/reward';
import * as Styled from './style';

type TProps = {
  onPress?: () => void;
  reward: TReward;
  showFamilyMembers?: boolean;
};

export const FeaturedReward = ({ reward, onPress, showFamilyMembers, ...props }: TProps) => {
  const { push } = useNavigation<TRootStackNavigationProp>();
  const { t } = useTranslation();

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

  return (
    <Styled.Container {...props} onPress={onPressReward}>
      <Styled.Star source={Star} />
      <Styled.ImageContainer>
        <RewardImage hasRadius picture={reward.pictures?.[0]} />
      </Styled.ImageContainer>
      <Styled.ContentContainer>
        <Styled.Badge>
          <Typography color="neutral.0" fontStyle="bold" size="xsmall">
            {t('SHOP.FEATURED_REWARDS.BADGE')}
          </Typography>
        </Styled.Badge>
        <Styled.TitleContainer>
          <Typography color="neutral.0" fontStyle="bold">
            {reward.title}
          </Typography>
        </Styled.TitleContainer>
        <Styled.PointsAndLabelContainer>
          {!!reward.points && <Points points={reward.points} theme="white" />}
          {reward.online && <InAppRewardLabel theme="white" />}
        </Styled.PointsAndLabelContainer>
      </Styled.ContentContainer>
    </Styled.Container>
  );
};
