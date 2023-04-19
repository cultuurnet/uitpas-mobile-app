import React from 'react'
import { useTranslation } from 'react-i18next';
import { ActivityIndicator, RefreshControl } from 'react-native';
import { FlashList } from '@shopify/flash-list';

import { Reward, RewardLoader } from '../_components'
import { theme } from '../_styles/theme';
import { formatISOString } from '../_utils/dateHelpers';
import { useGetRedeemedRewards } from './_queries/useGetRedeemedRewards';
import * as Styled from './style';

// When everything fits on 1 line, and device font-size is not increased, the height of a listitem is 125
const MIMIMAL_REWARD_HEIGHT = 125;

export const RedeemedRewards = () => {
  const { t } = useTranslation();
  const { data: rewards, fetchNextPage, isLoading: isRewardsLoading, refetch, isRefetching, isFetchingNextPage } = useGetRedeemedRewards();

  const members = rewards?.pages?.flatMap(({ member }) => member) ?? [];

  return <FlashList
    ItemSeparatorComponent={Styled.Separator}
    ListEmptyComponent={isRewardsLoading ? <>{[1, 2, 3, 4].map(key => <RewardLoader key={key} mode='list' />)}</> : <Styled.NoContentText align="center">{t('PROFILE.REDEEMED_REWARDS.EMPTY')}</Styled.NoContentText>}
    ListFooterComponent={isFetchingNextPage && <Styled.FooterLoadingContainer><ActivityIndicator color={theme.palette.primary['500']} /></Styled.FooterLoadingContainer>}
    contentContainerStyle={{ paddingBottom: 105 }}
    data={members}
    estimatedItemSize={MIMIMAL_REWARD_HEIGHT}
    keyExtractor={(item) => item.id}
    onEndReached={!isRewardsLoading ? fetchNextPage : () => { }}
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
        mode='list'
        reward={item.reward}
        subtitle={t("PROFILE.REDEEMED_REWARDS.REDEEMED_ON", { date: formatISOString(item.redeemDate, 'dd/MM') })}
      />
    )}
  />;
}
