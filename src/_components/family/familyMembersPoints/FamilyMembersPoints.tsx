import { ReactElement } from 'react';
import { useTranslation } from 'react-i18next';
import { FlatList, StyleProp, View, ViewStyle } from 'react-native';

import { getAvatarByNameOrDefault } from '../../../_utils';
import { TFamilyMember } from '../../../profile/_models';
import Typography from '../../typography/Typography';
import * as Styled from './style';

type TProps<T extends { member: TFamilyMember }> = {
  ItemAccessibilityLabel?: ({ item }: { item: T }) => string;
  ItemRightComponent?: ({ item }: { item: T }) => ReactElement;
  ItemSubtitle?: ({ item }: { item: T }) => ReactElement;
  members: Array<T>;
  style?: StyleProp<ViewStyle>;
};

export const FamilyMembersPoints = <T extends { member: TFamilyMember }>({
  members,
  ItemAccessibilityLabel,
  ItemRightComponent,
  ItemSubtitle,
  style,
}: TProps<T>) => {
  const { t } = useTranslation();

  return (
    <FlatList
      ItemSeparatorComponent={Styled.Divider}
      contentContainerStyle={style}
      data={members}
      keyExtractor={item => item.member.uitpasNumber}
      nestedScrollEnabled={false}
      removeClippedSubviews={false}
      renderItem={({ item }) => {
        const accessibilityLabel = ItemAccessibilityLabel?.({ item });

        return (
          <Styled.Item accessibilityLabel={accessibilityLabel} accessible={!!accessibilityLabel}>
            <Styled.Avatar contentFit="contain" source={getAvatarByNameOrDefault(item.member.icon)} />
            <Styled.ItemBody
              accessibilityElementsHidden={!!accessibilityLabel}
              importantForAccessibility={accessibilityLabel ? 'no-hide-descendants' : 'auto'}
            >
              <Typography accessible={!accessibilityLabel} fontStyle="bold" numberOfLines={1}>
                {item.member.passholder.firstName}
                {item.member.mainFamilyMember ? ` ${t('SHOP_DETAIL.WHO_CAN_REDEEM.YOU')}` : ''}
              </Typography>
              {ItemSubtitle ? (
                <ItemSubtitle item={item} />
              ) : (
                <Typography color="primary.700" fontStyle="semibold" numberOfLines={1} size="small">
                  {t('SHOP_DETAIL.WHO_CAN_REDEEM.POINTS', { count: item.member.passholder.points })}
                </Typography>
              )}
            </Styled.ItemBody>
            {ItemRightComponent && (
              <View
                accessibilityElementsHidden={!!accessibilityLabel}
                importantForAccessibility={accessibilityLabel ? 'no-hide-descendants' : 'auto'}
              >
                <ItemRightComponent item={item} />
              </View>
            )}
          </Styled.Item>
        );
      }}
      scrollEnabled={false}
    />
  );
};
