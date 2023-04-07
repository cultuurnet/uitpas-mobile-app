import React, { useCallback } from 'react'
import { useTranslation } from 'react-i18next';
import { FlatList } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { Icon, Reward, Typography } from '../../../_components';
import { REWARD_TILE_WIDTH } from '../../../_components/reward/style';
import { TMainNavigationProp } from '../../../_routing';
import { TFilterRewardCategory, TFilterRewardSections, useGetRewards } from '../../_queries/useGetRewards';
import { RewardsSectionLoader } from './RewardSection.loading';
import * as Styled from './style';

export type TRewardSectionProps = {
  category?: TFilterRewardCategory;
  filter?: TFilterRewardSections;
  horizontal?: boolean;
  title: string;
}
export const RewardsSection = ({ horizontal, filter, title, category }: TRewardSectionProps) => {
  const { data, isLoading } = useGetRewards({ itemsPerPage: horizontal ? 20 : 3, section: filter });
  const { t } = useTranslation();
  const { navigate } = useNavigation<TMainNavigationProp>();
  const rewards = data?.pages[0]?.member;

  const onPressMore = useCallback(() => {
    navigate('FilteredShop', { category, filter, subtitle: title });
  }, [title, filter, navigate, category]);

  // We need to have 2 or more results to display the section
  if (!isLoading && !(rewards?.length >= 2)) return null;

  if (isLoading) return <RewardsSectionLoader horizontal={horizontal} />;

  return (
    <Styled.Container>
      <Styled.Header>
        <Typography fontStyle='bold' size='large'>{title}</Typography>
        <Styled.ShowMoreButton activeOpacity={0.8} onPress={onPressMore}>
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
          renderItem={({ item: reward }) => <Styled.RewardTile mode="tile" reward={reward} />}
          showsHorizontalScrollIndicator={false}
          snapToAlignment='start'
          snapToInterval={REWARD_TILE_WIDTH + Styled.RewardTileMargin}
        />
      </> : <>
        {rewards?.map((reward) => (
          <React.Fragment key={reward.id}>
            <Reward key={reward.id} mode="list" reward={reward} />
            <Styled.Separator />
          </React.Fragment>
        ))}
      </>}
    </Styled.Container>
  )
}
