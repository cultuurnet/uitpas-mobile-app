import React, { useCallback } from 'react'
import { useTranslation } from 'react-i18next';
import { FlatList } from 'react-native';

import { Icon, Reward, Typography } from '../../../_components';
import { REWARD_TILE_WIDTH } from '../../../_components/reward/style';
import { TReward } from '../../_models/reward';
import { TFilterRewardSections, useGetRewards } from '../../_queries/useGetRewards';
import * as Styled from './style';

type TProps = {
  filter: TFilterRewardSections;
  horizontal?: boolean;
  title: string;
}
export const RewardsSection = ({ horizontal, filter, title }: TProps) => {
  const { data, isLoading } = useGetRewards({ itemsPerPage: horizontal ? 20 : 3, section: filter });
  const { t } = useTranslation();
  const rewards = data?.pages[0]?.member;
  const onPressReward = useCallback((_reward: TReward) => {
  }, []);

  // We need to have 2 or more results to display the section
  if (!isLoading && !(rewards?.length >= 2)) return null;

  return (
    <Styled.Container>
      <Styled.Header>
        <Typography fontStyle='bold' size='large'>{title}</Typography>
        <Styled.ShowMoreButton activeOpacity={0.8} onPress={() => { }}>
          <Typography color="primary.800" fontStyle='bold' size="small">{t('SHOP.SHOW_MORE')} </Typography><Icon color="primary.800" name="ArrowRight" />
        </Styled.ShowMoreButton>
      </Styled.Header>

      {horizontal ? <>
        <FlatList
          contentContainerStyle={Styled.ContentContainerStyle}
          data={rewards}
          decelerationRate='fast'
          horizontal
          keyExtractor={item => item.id}
          renderItem={({ item: reward }) => <Styled.RewardTile mode="tile" onPress={() => onPressReward(reward)} reward={reward} />}
          showsHorizontalScrollIndicator={false}
          snapToAlignment='start'
          snapToInterval={REWARD_TILE_WIDTH + Styled.RewardTileMargin}
        />
      </> : <>
        {rewards?.map((reward) => (
          <React.Fragment key={reward.id}>
            <Reward key={reward.id} mode="list" onPress={() => onPressReward(reward)} reward={reward} />
            <Styled.Separator />
          </React.Fragment>
        ))}
      </>}
    </Styled.Container>
  )
}
