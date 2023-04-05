import React from 'react'
import { useTranslation } from 'react-i18next';
import { FlashList } from '@shopify/flash-list';

import { TIconName } from '../../../_components/icon/Icon';
import { theme } from '../../../_styles/theme';
import { TFilterRewardCategory, TFilterRewardSections } from '../../_queries/useGetRewards';
import * as Styled from './style';

type TCategoryListItem = { icon: TIconName; key: string; label: string; params: { category?: TFilterRewardCategory, type?: TFilterRewardSections } };
const CATEGORIES: TCategoryListItem[] = [
  { icon: 'Sport', key: '1', label: 'SHOP.SECTIONS.SPORT', params: { type: 'sport' } },
  { icon: 'Activity', key: '2', label: 'SHOP.SECTIONS.DO', params: { category: 'Doen' } },
  { icon: 'Charity', key: '3', label: 'SHOP.SECTIONS.CHARITY', params: { category: 'Goede doel' } },
  { icon: 'Bag', key: '4', label: 'SHOP.SECTIONS.GADGET', params: { category: 'Gadget of item' } },
  { icon: 'Clock', key: '5', label: 'SHOP.SECTIONS.LAST_CHANCE', params: { category: 'laatste kans' } },
];

export const CategoryFilters = () => {
  const { t } = useTranslation();

  return (
    <Styled.Container>
      <FlashList
        contentContainerStyle={{ paddingHorizontal: theme.common.defaultSpacing }}
        data={CATEGORIES}
        horizontal
        keyExtractor={item => item.key}
        renderItem={({ item }) => <Styled.Button icon={item.icon} label={t(item.label)} onPress={() => { }} />}
        showsHorizontalScrollIndicator={false}
      />
    </Styled.Container>
  )
}
