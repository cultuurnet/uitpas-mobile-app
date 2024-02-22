import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ActivityIndicator, RefreshControl } from 'react-native';
import { FlashList } from '@shopify/flash-list';

import { Analytics, FamilyFilter, Reward, RewardLoader } from '../_components';
import { TRootStackNavigationProp, TRootStackRouteProp } from '../_routing';
import { theme } from '../_styles/theme';
import { normalizeForSlug } from '../_utils';
import { useHasFamilyMembers } from '../onboarding/family/_queries';
import { useGetMe } from '../profile/_queries/useGetMe';
import { getRewardFilters } from '../shop/_helpers/getRewardFilters';
import { useGetRewards } from '../shop/_queries/useGetRewards';
import { WelcomeHeader } from './_components/WelcomeHeader';
import * as Styled from './style';

type TProps = {
  navigation: TRootStackNavigationProp<'FilteredShop'>;
  route: TRootStackRouteProp<'FilteredShop'>;
};

// When everything fits on 1 line, and device font-size is not increased, the height of a listitem is 125
const MINIMAL_REWARD_HEIGHT = 125;

export const FilteredShop = ({ route }: TProps) => {
  const { subtitle, section, category, type } = route.params || {};
  const { t } = useTranslation();

  const { data: me } = useGetMe();
  const [selectedPassHolder, setSelectedPassHolder] = useState(me);
  const { getFiltersForCategory, getFiltersForSection } = getRewardFilters({ passHolder: selectedPassHolder });
  const { data: hasFamilyMembers } = useHasFamilyMembers();
  const {
    data: rewards,
    fetchNextPage,
    isLoading: isRewardsLoading,
    refetch,
    isFetchingNextPage,
  } = useGetRewards({
    filters: { type, ...getFiltersForSection(section), ...getFiltersForCategory(category) },
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
                <RewardLoader key={key} mode="list" skeletonKey={`filtered-shop-${key}`} />
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
            <>
              {hasFamilyMembers && (
                <FamilyFilter selectedPassHolder={selectedPassHolder} setSelectedPassHolder={setSelectedPassHolder} />
              )}
              <WelcomeHeader />
            </>
          ) : (
            <Styled.Header fontStyle="bold" size="xxxlarge">
              {subtitle}
            </Styled.Header>
          )
        }
        contentContainerStyle={{ paddingBottom: 105 }}
        data={members}
        estimatedItemSize={MINIMAL_REWARD_HEIGHT}
        keyExtractor={item => item.id}
        onEndReached={!isRewardsLoading ? fetchNextPage : () => {}}
        onEndReachedThreshold={0.1}
        refreshControl={
          <RefreshControl
            colors={[theme.palette.primary['500'], theme.palette.neutral['0']]}
            onRefresh={refetch}
            refreshing={false} // Don't show the refresh control on loading new data, as this causes a layout shift when selecting another member in the list
            tintColor={theme.palette.primary['500']}
          />
        }
        renderItem={({ item }) => (
          <Reward mode="list" reward={item} showFamilyMembers={!isFilteredOnWelcome && hasFamilyMembers} />
        )}
      />
    </>
  );
};
