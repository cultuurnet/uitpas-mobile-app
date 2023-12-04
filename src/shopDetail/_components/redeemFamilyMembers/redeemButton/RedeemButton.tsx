import { useTranslation } from 'react-i18next';

import { BlurredModal, Button, Icon, Typography } from '../../../../_components';
import { useToggle } from '../../../../_hooks';
import { TFamilyMember } from '../../../../profile/_models';
import { TReward } from '../../../../shop/_models/reward';
import { useGetRedeemStatus } from '../../../_queries/useGetRedeemStatus';
import * as Styled from './style';

type TProps = {
  member: TFamilyMember;
  onPress: () => void;
  reward: TReward;
};

export const RedeemButton = ({ member, onPress, reward }: TProps) => {
  const { t } = useTranslation();
  const [showUnredeemableModal, toggleUnredeemableModal] = useToggle(false);

  const { error, isLoading } = useGetRedeemStatus({ passHolder: member.passholder, rewardId: reward.id });

  if (isLoading) {
    return <Button color="primary.700" loading variant="link" />;
  }

  if (error) {
    return (
      <>
        <Styled.UnredeemableStatus color="primary.700" fontStyle="normal" onPress={toggleUnredeemableModal} size="small">
          {t('SHOP_DETAIL.WHO_CAN_REDEEM.UNREDEEMABLE')}
        </Styled.UnredeemableStatus>
        <BlurredModal isVisible={showUnredeemableModal} toggleIsVisible={toggleUnredeemableModal}>
          <Styled.UnredeemableModalTitle fontStyle="bold" size="large">
            {t('SHOP_DETAIL.WHO_CAN_REDEEM.UNREDEEMABLE_MODAL_TITLE')}
          </Styled.UnredeemableModalTitle>
          <Typography>{error.endUserMessage.nl}</Typography>
          <Styled.UnredeemableModalCloseButton
            fontStyle="semibold"
            label={t('SHOP_DETAIL.WHO_CAN_REDEEM.UNREDEEMABLE_MODAL_CLOSE')}
            underline={false}
            variant="link"
          />
        </BlurredModal>
      </>
    );
  }

  if (reward.online) {
    return <Styled.RedeemButton fontSize="small" label={t('SHOP_DETAIL.WHO_CAN_REDEEM.REDEEM')} onPress={onPress} />;
  }

  return <Icon color="primary.700" name="CircledCheck" />;
};
