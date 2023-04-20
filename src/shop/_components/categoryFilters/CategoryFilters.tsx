import React, { useCallback, useState } from 'react'
import { useTranslation } from 'react-i18next';
import { useWindowDimensions } from 'react-native';
import { FlashList } from '@shopify/flash-list';

import { TIconName } from '../../../_components/icon/Icon';
import { useStackNavigation } from '../../../_hooks';
import { TRootStackParamList } from '../../../_routing';
import { theme } from '../../../_styles/theme';
import { TFilterRewardCategory, TFilterRewardSections } from '../../_queries/useGetRewards';
import * as Styled from './style';

type TCategoryListItem = { icon: TIconName; label: string; params: { category?: TFilterRewardCategory, filter?: TFilterRewardSections } };
const CATEGORIES: TCategoryListItem[] = [
  { icon: 'Sport', label: 'SHOP.SECTIONS.SPORT', params: { filter: 'sport' } },
  { icon: 'Activity', label: 'SHOP.SECTIONS.DO', params: { category: 'Doen' } },
  { icon: 'Charity', label: 'SHOP.SECTIONS.CHARITY', params: { category: 'Goede doel' } },
  { icon: 'Bag', label: 'SHOP.SECTIONS.GADGET', params: { category: 'Gadget of item' } },
  { icon: 'Food', label: 'SHOP.SECTIONS.FOOD', params: { category: 'Eten en drinken' } },
  { icon: 'Clock', label: 'SHOP.SECTIONS.LAST_CHANCE', params: { category: 'laatste kans' } },
];

const HIDE_SHADOW_OFFSET = 24;

export const CategoryFilters = () => {
  const { t } = useTranslation();
  const { width: deviceWidth } = useWindowDimensions();
  const [isAtEnd, toggleIsAtEnd] = useState(false);
  const { navigate } = useStackNavigation<TRootStackParamList>();

  const onPress = useCallback((params: TCategoryListItem['params'], label: string) => {
    navigate('FilteredShop', { ...params, subtitle: t(label) });
  }, [navigate, t]);



  return (
    <Styled.Container>
      <FlashList
        contentContainerStyle={{ paddingHorizontal: theme.common.defaultSpacing }}
        data={CATEGORIES}
        horizontal
        keyExtractor={item => item.icon}
        onScroll={({
          nativeEvent: {
            contentOffset: { x },
            contentSize: { width }
          }
        }) => {
          if (width - deviceWidth - HIDE_SHADOW_OFFSET > x) {
            // We are not at the end, so set the boolean to false
            toggleIsAtEnd(false);
          } else {
            toggleIsAtEnd(true);
          }
        }}
        renderItem={({ item }) => <Styled.Button icon={item.icon} label={t(item.label)} onPress={() => onPress(item.params, item.label)} />}
        scrollEventThrottle={16}
        showsHorizontalScrollIndicator={false}
      />
      <Styled.Gradient
        accessible={false}
        colors={[`${theme.palette.neutral[100]}00`, `${theme.palette.neutral[100]}${isAtEnd ? '00' : ''}`]}
        end={{ x: 1, y: 0 }}
        pointerEvents='none'
        start={{ x: 0, y: 0 }}
      />
    </Styled.Container>
  )
}
