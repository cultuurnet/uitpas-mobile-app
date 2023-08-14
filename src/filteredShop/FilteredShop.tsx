import React from 'react';
import { useTranslation } from 'react-i18next';
import { ActivityIndicator, RefreshControl } from 'react-native';
import { FlashList } from '@shopify/flash-list';

import { Analytics, Reward, RewardLoader } from '../_components';
import { TRootStackNavigationProp, TRootStackRouteProp } from '../_routing';
import { theme } from '../_styles/theme';
import { normalizeForSlug } from '../_utils';
import { useGetRewards } from '../shop/_queries/useGetRewards';
import { getFiltersForCategory, getFiltersForSection } from '../shop/_utils/reward';
import { WelcomeHeader } from './_components/WelcomeHeader';
import * as Styled from './style';

type TProps = {
  navigation: TRootStackNavigationProp<'FilteredShop'>;
  route: TRootStackRouteProp<'FilteredShop'>;
};

// When everything fits on 1 line, and device font-size is not increased, the height of a listitem is 125
const MIMIMAL_REWARD_HEIGHT = 125;

export const FilteredShop = ({ route }: TProps) => {
  const { subtitle, section, category, type } = route.params || {};
  const { t } = useTranslation();
  const {
    data: rewards,
    fetchNextPage,
    isLoading: isRewardsLoading,
    refetch,
    isRefetching,
    isFetchingNextPage,
  } = useGetRewards({
    filters: { ...getFiltersForSection(section), ...getFiltersForCategory(category), type },
    itemsPerPage: 20,
  });

  const members = rewards?.pages?.flatMap(({ member }) => member) ?? [];
  const isFilteredOnWelcome = section === 'welkom';

  return (
    <>
      <Analytics
        screenName={isFilteredOnWelcome ? 'welcome-rewards' : `rewardshop-list-${normalizeForSlug(category || section)}`}
      />
      <FlashList
        ItemSeparatorComponent={Styled.Separator}
        ListEmptyComponent={
          isRewardsLoading ? (
            <>
              {[1, 2, 3, 4].map(key => (
                <RewardLoader key={key} mode="list" />
              ))}
            </>
          ) : (
            <Styled.NoContentText size="small">{t('SHOP.NO_RESULTS')}</Styled.NoContentText>
          )
        }
        ListFooterComponent={
          isFetchingNextPage && (
            <Styled.FooterLoadingContainer>
              <ActivityIndicator color={theme.palette.primary['500']} />
            </Styled.FooterLoadingContainer>
          )
        }
        ListHeaderComponent={
          isFilteredOnWelcome ? (
            <WelcomeHeader />
          ) : (
            <Styled.Header fontStyle="bold" size="xxxlarge">
              {subtitle}
            </Styled.Header>
          )
        }
        contentContainerStyle={{ paddingBottom: 105 }}
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
        renderItem={({ item }) => <Reward mode="list" reward={item} />}
      />
    </>
  );
};
