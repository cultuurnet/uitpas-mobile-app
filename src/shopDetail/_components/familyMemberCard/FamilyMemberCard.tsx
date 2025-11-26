import { useTranslation } from 'react-i18next';

import { Typography } from '../../../_components';
import { getAvatarByNameOrDefault } from '../../../_utils';
import { TFamilyMember } from '../../../profile/_models';
import * as Styled from './style';

type TProps = {
  member: TFamilyMember;
  title?: string;
};

export const FamilyMemberCard = ({ title, member }: TProps) => {
  const { t } = useTranslation();

  return (
    <>
      {title && <Typography fontStyle="bold">{title}</Typography>}
      <Styled.Card>
        <Styled.Avatar contentFit="contain" source={getAvatarByNameOrDefault(member.icon)} />
        <Styled.Body>
          <Typography fontStyle="bold" numberOfLines={1}>
            {member.passholder.firstName}
            {member.mainFamilyMember ? ` ${t('SHOP_DETAIL.WHO_CAN_REDEEM.YOU')}` : ''}
          </Typography>
          <Typography color="primary.700" fontStyle="semibold" numberOfLines={1} size="small">
            {t('SHOP_DETAIL.WHO_CAN_REDEEM.POINTS', { count: member.passholder.points })}
          </Typography>
        </Styled.Body>
      </Styled.Card>
    </>
  );
};
