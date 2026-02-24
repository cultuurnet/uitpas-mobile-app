import React, { useCallback, useMemo, useState } from 'react';
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
import { FEATURED_CARD_SYSTEM_ID } from '../shop/_queries/useGetFeaturedRewards';
import { useGetRewards } from '../shop/_queries/useGetRewards';
import { WelcomeHeader } from './_components/WelcomeHeader';
import * as Styled from './style';

type TProps = { navigation: TRootStackNavigationProp<'FilteredShop'>; route: TRootStackRouteProp<'FilteredShop'> };

export const FilteredShop = ({ route }: TProps) => {
  const { subtitle, section, category, type, isFeatured } = route.params || {};
  const { t } = useTranslation();

  const { data: me } = useGetMe();
  const [selectedPassHolder, setSelectedPassHolder] = useState(me);
  const { data: hasFamilyMembers } = useHasFamilyMembers();

  const filters = useMemo(() => {
    if (isFeatured) {
      return {};
    }

    const { getFiltersForCategory, getFiltersForSection } = getRewardFilters({ passHolder: selectedPassHolder });
    return { type, ...getFiltersForSection(section), ...getFiltersForCategory(category) };
  }, [isFeatured, selectedPassHolder, type, section, category]);

  const {
    data: rewards,
    fetchNextPage,
    isLoading: isRewardsLoading,
    refetch,
    isFetchingNextPage,
  } = useGetRewards({
    filters,
    itemsPerPage: 20,
    params: isFeatured ? { featured: true, owningCardSystemId: FEATURED_CARD_SYSTEM_ID } : {},
  });

  const members = useMemo(() => rewards?.pages?.flatMap(({ member }) => member) ?? [], [rewards?.pages]);
  const isFilteredOnWelcome = section === 'welkom';

  const renderItem = useCallback(
    ({ item }: { item: (typeof members)[number] }) => (
      <Reward mode="list" reward={item} showFamilyMembers={!isFilteredOnWelcome && hasFamilyMembers} />
    ),
    [isFilteredOnWelcome, hasFamilyMembers],
  );

  const onEndReached = useCallback(() => {
    if (!isRewardsLoading) {
      fetchNextPage();
    }
  }, [isRewardsLoading, fetchNextPage]);

  const getScreenName = useCallback(() => {
    if (isFeatured) return 'rewardshop-list-featured';
    if (isFilteredOnWelcome) return 'welcome-rewards';
    return `rewardshop-list-${normalizeForSlug(category || section)}`;
  }, [isFeatured, isFilteredOnWelcome, category, section]);

  return (
    <>
      <Analytics screenName={getScreenName()} />
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
        keyExtractor={item => item.id}
        onEndReached={onEndReached}
        onEndReachedThreshold={0.1}
        refreshControl={
          <RefreshControl
            colors={[theme.palette.primary['500'], theme.palette.neutral['0']]}
            onRefresh={refetch}
            refreshing={false} // Don't show the refresh control on loading new data, as this causes a layout shift when selecting another member in the list
            tintColor={theme.palette.primary['500']}
          />
        }
        renderItem={renderItem}
      />
    </>
  );
};
