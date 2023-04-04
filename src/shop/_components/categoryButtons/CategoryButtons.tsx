import React, { useCallback } from 'react'
import { useTranslation } from 'react-i18next';
import { FlatList } from 'react-native';

import { TIconName } from '../../../_components/icon/Icon';
import { useStackNavigation } from '../../../_hooks';
import { TRootStackParamList } from '../../../_routing';
import { theme } from '../../../_styles/theme';
import { TFilterRewardCategory, TFilterRewardSections } from '../../_queries/useGetRewards';
import * as Styled from './style';

type TCategoryListItem = { icon: TIconName; key: string; label: string; params: { category?: TFilterRewardCategory, filter?: TFilterRewardSections } };
const CATEGORIES: TCategoryListItem[] = [
  { icon: 'Sport', key: '1', label: 'SHOP.SECTIONS.SPORT', params: { filter: 'sport' } },
  { icon: 'Activity', key: '2', label: 'SHOP.SECTIONS.DO', params: { category: 'Doen' } },
  { icon: 'Charity', key: '3', label: 'SHOP.SECTIONS.CHARITY', params: { category: 'Goede doel' } },
  { icon: 'Bag', key: '4', label: 'SHOP.SECTIONS.GADGET', params: { category: 'Gadget of item' } },
  { icon: 'Clock', key: '5', label: 'SHOP.SECTIONS.LAST_CHANCE', params: { category: 'laatste kans' } },
];

export const CategoryButtons = () => {
  const { t } = useTranslation();
  const { navigate } = useStackNavigation<TRootStackParamList>();

  const onPress = useCallback((params: TCategoryListItem['params'], label: string) => {
    navigate('FilteredShop', { ...params, subtitle: t(label) });
  }, [navigate, t]);


  return (
    <Styled.Container>
      <FlatList
        contentContainerStyle={{ paddingHorizontal: theme.common.defaultSpacing }}
        data={CATEGORIES}
        horizontal
        keyExtractor={item => item.key}
        renderItem={({ item }) => <Styled.Button icon={item.icon} label={t(item.label)} onPress={() => onPress(item.params, item.label)} />}
        showsHorizontalScrollIndicator={false}
      />
    </Styled.Container>
  )
}
