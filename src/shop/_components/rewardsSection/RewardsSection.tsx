import React, { useCallback, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { FlatList } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { Icon, Reward, Typography } from '../../../_components';
import { REWARD_TILE_WIDTH } from '../../../_components/reward/style';
import { useTracking } from '../../../_context';
import { TMainNavigationProp } from '../../../_routing';
import { getRewardTrackingData } from '../../../_utils';
import { useGetMe } from '../../../profile/_queries/useGetMe';
import { getRewardFilters, TFilterRewardCategory, TFilterRewardSection } from '../../_helpers/getRewardFilters';
import { useGetRewards } from '../../_queries/useGetRewards';
import { RewardsSectionLoader } from './RewardSection.loading';
import * as Styled from './style';

export type TRewardSectionProps = {
  category?: TFilterRewardCategory;
  // id of a reward that should be filtered out
  filterRewardId?: string;
  hideMoreButton?: boolean;
  horizontal?: boolean;
  onLoaded?: () => void;
  organizerId?: string[];
  section?: TFilterRewardSection;
  title: string;
};

export const RewardsSection = ({
  horizontal,
  section,
  title,
  filterRewardId,
  hideMoreButton,
  category,
  organizerId,
  onLoaded,
  ...props
}: TRewardSectionProps) => {
  const { data: me } = useGetMe();
  const { getFiltersForCategory, getFiltersForSection } = getRewardFilters({ passHolder: me });
  const { data, isLoading } = useGetRewards({
    filters: { ...getFiltersForSection(section), ...getFiltersForCategory(category) },
    itemsPerPage: horizontal ? 20 : 3,
    organizerId,
  });
  const { t } = useTranslation();
  const { navigate, push } = useNavigation<TMainNavigationProp>();
  const { trackSelfDescribingEvent } = useTracking();
  // Filter when there are rewards that shouldn't be shown (eg, when we show related rewards at the bottom a reward detail)
  const rewards = data?.pages[0]?.member?.filter?.(reward => reward.id !== filterRewardId);

  const onPressMore = useCallback(() => {
    trackSelfDescribingEvent('swimlaneInteraction', {
      action: 'click-view-more',
      algo: {
        name: 'default',
        version: '0',
      },
      'swimlane-direction': horizontal ? 'horizontal' : 'vertical',
      'swimlane-title': title,
    });
    navigate('FilteredShop', { category, section, subtitle: title });
  }, [title, section, navigate, category, horizontal, trackSelfDescribingEvent]);

  useEffect(() => {
    if (isLoading) return;
    onLoaded?.();
  }, [isLoading, onLoaded]);

  // We need to have 2 or more results to display the section
  if (!isLoading && !(rewards?.length >= 2)) return null;
  if (isLoading) return <RewardsSectionLoader horizontal={horizontal} skeletonKey={title} />;

  return (
    <Styled.Container {...props}>
      <Styled.Header>
        <Styled.SectionTile fontStyle="bold" size="large">
          {title}
        </Styled.SectionTile>
        {!hideMoreButton && (
          <Styled.ShowMoreButton activeOpacity={0.8} onPress={onPressMore}>
            <Typography color="primary.800" fontStyle="bold" size="small">
              {t('SHOP.SHOW_MORE')}{' '}
            </Typography>
            <Icon color="primary.800" name="ArrowRight" />
          </Styled.ShowMoreButton>
        )}
      </Styled.Header>

      {horizontal ? (
        <>
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
                'swimlane-title': title,
              });
            }}
            renderItem={({ item: reward }) => (
              <Styled.RewardTile
                mode="tile"
                onPress={() => {
                  trackSelfDescribingEvent(
                    'swimlaneInteraction',
                    {
                      action: 'click',
                      algo: {
                        name: 'default',
                        version: '0',
                      },
                      'swimlane-direction': 'horizontal',
                      'swimlane-title': title,
                    },
                    { reward: getRewardTrackingData(reward) },
                  );

                  push('ShopDetail', {
                    id: reward.id,
                    reward,
                  });
                }}
                reward={reward}
              />
            )}
            showsHorizontalScrollIndicator={false}
            snapToAlignment="start"
            snapToInterval={REWARD_TILE_WIDTH + Styled.RewardTileMargin}
          />
        </>
      ) : (
        <>
          {rewards?.map(reward => (
            <React.Fragment key={reward.id}>
              <Reward
                key={reward.id}
                mode="list"
                onPress={() => {
                  trackSelfDescribingEvent(
                    'swimlaneInteraction',
                    {
                      action: 'click',
                      algo: {
                        name: 'default',
                        version: '0',
                      },
                      'swimlane-direction': 'vertical',
                      'swimlane-title': title,
                    },
                    { reward: getRewardTrackingData(reward) },
                  );

                  push('ShopDetail', {
                    id: reward.id,
                    reward,
                  });
                }}
                reward={reward}
              />
              <Styled.Separator />
            </React.Fragment>
          ))}
        </>
      )}
    </Styled.Container>
  );
};
