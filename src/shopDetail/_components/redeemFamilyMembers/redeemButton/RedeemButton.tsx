import { useTranslation } from 'react-i18next';

import { Button } from '../../../../_components';
import { TFamilyMember } from '../../../../profile/_models';
import { useGetRedeemStatus } from '../../../_queries/useGetRedeemStatus';
import * as Styled from './style';

type TProps = {
  familyMember: TFamilyMember;
  rewardId: string;
};

export const RedeemButton = ({ familyMember, rewardId }: TProps) => {
  const { t } = useTranslation();

  const { error, isLoading } = useGetRedeemStatus({ passHolder: familyMember.passholder, rewardId });

  if (isLoading) {
    return <Button color="primary.700" loading variant="link" />;
  }

  if (error) {
    return (
      <Styled.UnredeemableStatus color="primary.700" fontStyle="normal" size="small">
        {t('SHOP_DETAIL.WHO_CAN_REDEEM.UNREDEEMABLE')}
      </Styled.UnredeemableStatus>
    );
  }

  return <Styled.RedeemButton fontSize="small" label={t('SHOP_DETAIL.WHO_CAN_REDEEM.REDEEM')} />;
};
