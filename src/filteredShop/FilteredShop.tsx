import React from 'react'
import { ActivityIndicator, RefreshControl } from 'react-native';
import { FlashList } from '@shopify/flash-list';

import { Reward, RewardLoader } from '../_components'
import { TRootStackNavigationProp, TRootStackRouteProp } from '../_routing';
import { theme } from '../_styles/theme';
import { useGetRewards } from '../shop/_queries/useGetRewards';
import * as Styled from './style';

type TProps = {
  navigation: TRootStackNavigationProp<'FilteredShop'>;
  route: TRootStackRouteProp<'FilteredShop'>;
}
export const FilteredShop = ({ route }: TProps) => {
  const { subtitle, filter, category } = route.params || {};

  const { data: rewards, fetchNextPage, isLoading: isRewardsLoading, refetch, isRefetching, isFetchingNextPage } = useGetRewards({ category, itemsPerPage: 20, section: filter });

  const members = rewards?.pages?.flatMap(({ member }) => member) ?? [];

  return <FlashList
    ItemSeparatorComponent={Styled.Separator}
    ListEmptyComponent={isRewardsLoading && <>{[1, 2, 3, 4].map(key => <RewardLoader key={key} mode='list' />)}</>}
    ListFooterComponent={isFetchingNextPage && <Styled.FooterLoadingContainer><ActivityIndicator color={theme.palette.primary['500']} /></Styled.FooterLoadingContainer>}
    ListHeaderComponent={<Styled.Header fontStyle='bold' size='xxxlarge'>{subtitle}</Styled.Header>}
    contentContainerStyle={{ paddingBottom: 105 }}
    data={members}
    estimatedItemSize={125}
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
    renderItem={({ item }) => <Reward mode='list' onPress={() => { }} reward={item} />}
  />;
}
