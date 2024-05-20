import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ActivityIndicator, RefreshControl } from 'react-native';
import { FlashList } from '@shopify/flash-list';

import { Analytics, FamilyFilter, Reward, RewardLoader } from '../_components';
import { TRootStackNavigationProp } from '../_routing';
import { theme } from '../_styles/theme';
import { formatISOString } from '../_utils';
import { useHasFamilyMembers } from '../onboarding/family/_queries';
import { useGetMe } from '../profile/_queries/useGetMe';
import { useGetRedeemedRewards } from './_queries/useGetRedeemedRewards';
import * as Styled from './style';

// When everything fits on 1 line, and device font-size is not increased, the height of a listitem is 125
const MIMIMAL_REWARD_HEIGHT = 125;

type TProps = {
  navigation: TRootStackNavigationProp<'RedeemedRewards'>;
};

export const RedeemedRewards = ({ navigation }: TProps) => {
  const { t } = useTranslation();

  const { data: me } = useGetMe();
  const [selectedPassHolder, setSelectedPassHolder] = useState(me);
  const {
    data: rewards,
    fetchNextPage,
    isLoading: isRewardsLoading,
    refetch,
    isError,
    isRefetching,
    isFetchingNextPage,
  } = useGetRedeemedRewards({ passHolder: selectedPassHolder });
  const { data: hasFamilyMembers } = useHasFamilyMembers();

  const members = rewards?.pages?.flatMap(({ member }) => member) ?? [];

  return (
    <>
      <Analytics screenName="redeemed-rewards" />
      {hasFamilyMembers && <FamilyFilter selectedPassHolder={selectedPassHolder} setSelectedPassHolder={setSelectedPassHolder} />}
      <FlashList
        ItemSeparatorComponent={Styled.Separator}
        ListEmptyComponent={
          isRewardsLoading ? (
            <>
              {[1, 2, 3, 4].map(key => (
                <RewardLoader key={key} mode="list" skeletonKey={`redeemed-rewards-${key}`} />
              ))}
            </>
          ) : (
            <Styled.NoContentText align="center">
              {t(isError ? 'PROFILE.REDEEMED_REWARDS.ERROR' : 'PROFILE.REDEEMED_REWARDS.EMPTY')}
            </Styled.NoContentText>
          )
        }
        ListFooterComponent={
          isFetchingNextPage && (
            <Styled.FooterLoadingContainer>
              <ActivityIndicator color={theme.palette.primary['500']} />
            </Styled.FooterLoadingContainer>
          )
        }
        contentContainerStyle={{ paddingBottom: 105, paddingTop: 24 }}
        data={members}
        estimatedItemSize={MIMIMAL_REWARD_HEIGHT}
        keyExtractor={item => item.id}
        onEndReached={!isRewardsLoading ? fetchNextPage : () => {}}
        onEndReachedThreshold={0.1}
        refreshControl={
          <RefreshControl
            colors={[theme.palette.primary['500'], theme.palette.neutral['0']]}
            onRefresh={refetch}
            refreshing={isRefetching}
            tintColor={theme.palette.primary['500']}
          />
        }
        renderItem={({ item }) => (
          <Reward
            isRedeemed
            mode="list"
            onPress={() => navigation.navigate('RedeemedReward', { redeemedReward: item })}
            reward={item.reward}
            subtitle={t('PROFILE.REDEEMED_REWARDS.REDEEMED_ON', { date: formatISOString(item.redeemDate, 'dd/MM/yyyy') })}
          />
        )}
      />
    </>
  );
};
