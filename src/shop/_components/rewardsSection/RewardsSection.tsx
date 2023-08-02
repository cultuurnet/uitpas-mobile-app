import React, { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { FlatList } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { Icon, Reward, Typography } from '../../../_components';
import { REWARD_TILE_WIDTH } from '../../../_components/reward/style';
import { useTracking } from '../../../_context';
import { TMainNavigationProp } from '../../../_routing';
import { getRewardTrackingData } from '../../../_utils';
import { useGetRewards } from '../../_queries/useGetRewards';
import { getFiltersForCategory, getFiltersForSection, TFilterRewardCategory, TFilterRewardSection } from '../../_utils/reward';
import { RewardsSectionLoader } from './RewardSection.loading';
import * as Styled from './style';

export type TRewardSectionProps = {
  category?: TFilterRewardCategory;
  filterRewardId?: string;
  hideMoreButton?: boolean;
  horizontal?: boolean;
  organizerId?: string[];
  section?: TFilterRewardSection;
  title: string; // id of a reward that should be filtered out
};

export const RewardsSection = ({
  horizontal,
  section,
  title,
  filterRewardId,
  hideMoreButton,
  category,
  organizerId,
  ...props
}: TRewardSectionProps) => {
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

  // We need to have 2 or more results to display the section
  if (!isLoading && !(rewards?.length >= 2)) return null;

  if (isLoading) return <RewardsSectionLoader horizontal={horizontal} />;

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
                'swimlane-direction': horizontal ? 'horizontal' : 'vertical',
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
                      'swimlane-direction': horizontal ? 'horizontal' : 'vertical',
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
              <Reward key={reward.id} mode="list" reward={reward} />
              <Styled.Separator />
            </React.Fragment>
          ))}
        </>
      )}
    </Styled.Container>
  );
};
