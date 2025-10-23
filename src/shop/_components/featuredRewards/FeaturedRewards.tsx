import React, { useCallback, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { FlatList } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { Icon, Typography } from '../../../_components';
import { REWARD_TILE_WIDTH } from '../../../_components/reward/style';
import { useTracking } from '../../../_context';
import { TMainNavigationProp } from '../../../_routing';
import { getRewardTrackingData } from '../../../_utils';
import { useGetFeaturedRewards } from '../../_queries/useGetFeaturedRewards';
import { FeaturedReward } from '../featuredReward/FeaturedReward';
import * as Styled from './style';

export const FeaturedRewards = () => {
  const { t } = useTranslation();
  const { data, isLoading } = useGetFeaturedRewards();
  const { push } = useNavigation<TMainNavigationProp>();
  const { trackSelfDescribingEvent } = useTracking();

  const rewards = useMemo(() => data?.member ?? [], [data?.member]);

  const onPressReward = useCallback(
    reward => {
      trackSelfDescribingEvent(
        'swimlaneInteraction',
        {
          action: 'click',
          algo: {
            name: 'default',
            version: '0',
          },
          'swimlane-direction': rewards.length === 1 ? 'vertical' : 'horizontal',
          'swimlane-title': t('SHOP.FEATURED_REWARDS.SECTION_TITLE'),
        },
        { reward: getRewardTrackingData(reward) },
      );

      push('ShopDetail', {
        id: reward.id,
        reward,
      });
    },
    [push, rewards.length, t, trackSelfDescribingEvent],
  );

  if (!isLoading && rewards.length === 0) {
    return null;
  }

  if (rewards.length === 1) {
    const reward = rewards[0];
    return (
      <Styled.SingleRewardContainer>
        <FeaturedReward onPress={() => onPressReward(reward)} reward={reward} />
      </Styled.SingleRewardContainer>
    );
  }

  return (
    <Styled.Container>
      <Styled.Header>
        <Styled.SectionTile fontStyle="bold" size="large">
          {t('SHOP.FEATURED_REWARDS.SECTION_TITLE')}
        </Styled.SectionTile>
        <Styled.ShowMoreButton
          activeOpacity={0.8}
          onPress={() => {
            trackSelfDescribingEvent('swimlaneInteraction', {
              action: 'click-view-more',
              algo: {
                name: 'default',
                version: '0',
              },
              'swimlane-direction': 'horizontal',
              'swimlane-title': t('SHOP.FEATURED_REWARDS.SECTION_TITLE'),
            });

            push('FilteredShop', {
              category: undefined,
              isFeatured: true,
              section: undefined,
              subtitle: t('SHOP.FEATURED_REWARDS.SECTION_TITLE'),
              type: undefined,
            });
          }}
        >
          <Typography color="primary.800" fontStyle="bold" size="small">
            {t('SHOP.SHOW_MORE')}{' '}
          </Typography>
          <Icon color="primary.800" name="ArrowRight" />
        </Styled.ShowMoreButton>
      </Styled.Header>
      <FlatList
        contentContainerStyle={Styled.ContentContainerStyle}
        data={rewards}
        decelerationRate="fast"
        horizontal
        keyExtractor={item => item.id}
        onTouchEnd={() => {
          trackSelfDescribingEvent('swimlaneInteraction', {
            action: 'swipe',
            algo: {
              name: 'default',
              version: '0',
            },
            'swimlane-direction': 'horizontal',
            'swimlane-title': t('SHOP.FEATURED_REWARDS.SECTION_TITLE'),
          });
        }}
        renderItem={({ item: reward }) => <Styled.RewardTile mode="tile" onPress={() => onPressReward(reward)} reward={reward} />}
        showsHorizontalScrollIndicator={false}
        snapToAlignment="start"
        snapToInterval={REWARD_TILE_WIDTH + Styled.RewardTileMargin}
      />
    </Styled.Container>
  );
};
