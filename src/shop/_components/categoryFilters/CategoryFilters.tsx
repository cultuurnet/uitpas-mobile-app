import React, { useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useWindowDimensions } from 'react-native';
import { FlashList } from '@shopify/flash-list';

import { TIconName } from '../../../_components/icon/Icon';
import { useTracking } from '../../../_context';
import { useStackNavigation } from '../../../_hooks';
import { TRootStackParamList } from '../../../_routing';
import { theme } from '../../../_styles/theme';
import { normalizeForSlug } from '../../../_utils';
import { TFilterRewardCategory, TFilterRewardSection } from '../../_helpers/getRewardFilters';
import * as Styled from './style';

type TCategoryListItem = {
  icon: TIconName;
  label: string;
  params: { category?: TFilterRewardCategory; section?: TFilterRewardSection };
};
const CATEGORIES: TCategoryListItem[] = [
  { icon: 'Sport', label: 'SHOP.SECTIONS.SPORT', params: { section: 'sport' } },
  { icon: 'Activity', label: 'SHOP.SECTIONS.DO', params: { category: 'Doen' } },
  { icon: 'Charity', label: 'SHOP.SECTIONS.CHARITY', params: { category: 'Goede doel' } },
  { icon: 'Child', label: 'SHOP.SECTIONS.FOR_KIDS', params: { category: 'forKids' } },
  { icon: 'Bag', label: 'SHOP.SECTIONS.GADGET', params: { category: 'Gadget of item' } },
  { icon: 'Food', label: 'SHOP.SECTIONS.FOOD', params: { category: 'Eten en drinken' } },
  { icon: 'Clock', label: 'SHOP.SECTIONS.LAST_CHANCE', params: { category: 'laatste kans' } },
];

const HIDE_SHADOW_OFFSET = 12;

export const CategoryFilters = () => {
  const { t } = useTranslation();
  const { width: deviceWidth } = useWindowDimensions();
  const [isAtEnd, toggleIsAtEnd] = useState(false);
  const [isAtbegin, toggleIsAtBegin] = useState(true);
  const { navigate } = useStackNavigation<TRootStackParamList>();
  const { trackSelfDescribingEvent } = useTracking();

  const onPress = useCallback(
    (params: TCategoryListItem['params'], label: string) => {
      trackSelfDescribingEvent('buttonClick', {
        button_name: `rewardshop-filter-${normalizeForSlug(params?.category || params?.section)}`,
      });
      navigate('FilteredShop', { ...params, subtitle: t(label) });
    },
    [navigate, t, trackSelfDescribingEvent],
  );

  return (
    <Styled.Container>
      <FlashList
        contentContainerStyle={{ paddingHorizontal: theme.common.defaultSpacing }}
        data={CATEGORIES}
        estimatedItemSize={147}
        horizontal
        keyExtractor={item => item.icon}
        onScroll={({
          nativeEvent: {
            contentOffset: { x },
            contentSize: { width },
          },
        }) => {
          if (width - deviceWidth - HIDE_SHADOW_OFFSET > x) {
            // We are not at the end, so set the boolean to false
            toggleIsAtEnd(false);
          } else {
            toggleIsAtEnd(true);
          }

          if (HIDE_SHADOW_OFFSET < x) {
            toggleIsAtBegin(false);
          } else {
            toggleIsAtBegin(true);
          }
        }}
        renderItem={({ item }) => (
          <Styled.Button icon={item.icon} label={t(item.label)} onPress={() => onPress(item.params, item.label)} />
        )}
        scrollEventThrottle={16}
        showsHorizontalScrollIndicator={false}
      />
      <Styled.GradientLeft
        accessible={false}
        colors={[`${theme.palette.neutral[100]}00`, `${theme.palette.neutral[100]}${isAtbegin ? '00' : ''}`]}
        end={{ x: 0, y: 0 }}
        pointerEvents="none"
        start={{ x: 1, y: 0 }}
      />
      <Styled.GradientRight
        accessible={false}
        colors={[`${theme.palette.neutral[100]}00`, `${theme.palette.neutral[100]}${isAtEnd ? '00' : ''}`]}
        end={{ x: 1, y: 0 }}
        pointerEvents="none"
        start={{ x: 0, y: 0 }}
      />
    </Styled.Container>
  );
};
