import { ReactElement } from 'react';
import { useTranslation } from 'react-i18next';
import { FlatList, View } from 'react-native';

import { getAvatarByNameOrDefault } from '../../../_utils';
import { TFamilyMember } from '../../../profile/_models';
import Typography from '../../typography/Typography';
import * as Styled from './style';

type TProps = {
  RightComponent: ({ familyMember }: { familyMember: TFamilyMember }) => ReactElement;
  familyMembers: TFamilyMember[];
};

export const FamilyMemberPoints = ({ familyMembers, RightComponent }: TProps) => {
  const { t } = useTranslation();

  return (
    <FlatList
      ItemSeparatorComponent={Styled.Divider}
      data={familyMembers}
      keyExtractor={item => item.uitpasNumber}
      renderItem={({ item: familyMember }) => (
        <Styled.Item>
          <Styled.Avatar resizeMode="contain" source={getAvatarByNameOrDefault(familyMember.icon)} />
          <Styled.ItemBody>
            <Typography fontStyle="bold" numberOfLines={1}>
              {familyMember.passholder.firstName}
              {familyMember.mainFamilyMember ? ` ${t('SHOP_DETAIL.WHO_CAN_REDEEM.YOU')}` : ''}
            </Typography>
            <Typography color="primary.700" fontStyle="semibold" numberOfLines={1} size="small">
              {t('SHOP_DETAIL.WHO_CAN_REDEEM.POINTS', { count: familyMember.passholder.points })}
            </Typography>
          </Styled.ItemBody>
          <View>
            <RightComponent familyMember={familyMember} />
          </View>
        </Styled.Item>
      )}
    />
  );
};
