import React, { useCallback } from 'react'
import { useTranslation } from 'react-i18next';
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

export const CategoryFilters = () => {
  const { t } = useTranslation();
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
        renderItem={({ item }) => <Styled.Button icon={item.icon} label={t(item.label)} onPress={() => onPress(item.params, item.label)} />}
        showsHorizontalScrollIndicator={false}
      />
    </Styled.Container>
  )
}
