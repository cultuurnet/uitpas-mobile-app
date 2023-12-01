import { ReactElement } from 'react';
import { useTranslation } from 'react-i18next';
import { FlatList, StyleProp, View, ViewStyle } from 'react-native';

import { getAvatarByNameOrDefault } from '../../../_utils';
import { TFamilyMember } from '../../../profile/_models';
import Typography from '../../typography/Typography';
import * as Styled from './style';

type TProps = {
  RightComponent?: ({ member }: { member: TFamilyMember }) => ReactElement;
  Subtitle?: ({ member }: { member: TFamilyMember }) => ReactElement;
  members: TFamilyMember[];
  style?: StyleProp<ViewStyle>;
};

export const FamilyMembersPoints = ({ members, RightComponent, Subtitle, style }: TProps) => {
  const { t } = useTranslation();

  return (
    <FlatList
      ItemSeparatorComponent={Styled.Divider}
      contentContainerStyle={style}
      data={members}
      keyExtractor={item => item.uitpasNumber}
      renderItem={({ item: member }) => (
        <Styled.Item>
          <Styled.Avatar resizeMode="contain" source={getAvatarByNameOrDefault(member.icon)} />
          <Styled.ItemBody>
            <Typography fontStyle="bold" numberOfLines={1}>
              {member.passholder.firstName}
              {member.mainFamilyMember ? ` ${t('SHOP_DETAIL.WHO_CAN_REDEEM.YOU')}` : ''}
            </Typography>
            {Subtitle ? (
              <Subtitle member={member} />
            ) : (
              <Typography color="primary.700" fontStyle="semibold" numberOfLines={1} size="small">
                {t('SHOP_DETAIL.WHO_CAN_REDEEM.POINTS', { count: member.passholder.points })}
              </Typography>
            )}
          </Styled.ItemBody>
          {RightComponent && (
            <View>
              <RightComponent member={member} />
            </View>
          )}
        </Styled.Item>
      )}
    />
  );
};
