import React, { FC, useCallback, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { t } from 'i18next';

import { BlurredModal, BoldTrans, Button, Typography } from '../../../_components';
import { useTracking } from '../../../_context';
import { TRootStackNavigationProp } from '../../../_routing';
import { getLanguage, getRewardTrackingData } from '../../../_utils';
import { useActiveCard } from '../../../profile/_queries/useActiveCard';
import { TReward } from '../../../shop/_models/reward';
import { useRedeemReward } from '../../_queries/useRedeemReward';
import * as Styled from './style';

type TRedeemModalProps = {
  isVisible: boolean;
  reward: TReward;
  toggleIsVisible: () => void;
};

const RedeemModal: FC<TRedeemModalProps> = ({ reward, isVisible, toggleIsVisible }) => {
  const { navigate } = useNavigation<TRootStackNavigationProp<'ShopDetail'>>();
  const rewardTrackingData = getRewardTrackingData(reward);

  const {
    mutate: redeemReward,
    isLoading,
    error,
  } = useRedeemReward({
    onSuccess: redeemedReward => {
      toggleIsVisible();
      navigate('RedeemedReward', { isModal: true, redeemedReward });
    },
  });
  const activeCard = useActiveCard();
  const { trackSelfDescribingEvent } = useTracking();

  useEffect(() => {
    if (!error) return;

    trackSelfDescribingEvent('errorMessage', { message: error?.type }, { reward: rewardTrackingData });
  }, [error, trackSelfDescribingEvent, rewardTrackingData]);

  const handleConfirm = useCallback(() => {
    trackSelfDescribingEvent('buttonClick', { button_name: 'redeem-confirm' }, { reward: rewardTrackingData });
    redeemReward({ rewardId: reward.id, uitpasNumber: activeCard.uitpasNumber });
  }, [reward, redeemReward, activeCard.uitpasNumber, trackSelfDescribingEvent, rewardTrackingData]);

  const handleCancel = () => {
    trackSelfDescribingEvent('buttonClick', { button_name: 'redeem-cancel' }, { reward: rewardTrackingData });
    toggleIsVisible();
  };

  return (
    <BlurredModal isVisible={isVisible} toggleIsVisible={handleCancel}>
      <Typography bottomSpacing="12px" fontStyle="bold" size="xlarge">
        {t('SHOP_DETAIL.REDEEM.MODAL_TITLE')}
      </Typography>
      <BoldTrans i18nKey="SHOP_DETAIL.REDEEM.MODAL_DESCRIPTION" values={{ points: reward.points, title: reward.title }} />
      {!!error && (
        <Typography bottomSpacing="12px" color="error.500" size="small" topSpacing="12px">
          {error?.endUserMessage?.[getLanguage()] || t('SHOP_DETAIL.REDEEM.MODAL_GENERIC_ERROR')}
        </Typography>
      )}
      <Styled.ButtonContainer>
        <Styled.FirstButton label={t('SHOP_DETAIL.REDEEM.MODAL_BUTTON_CONFIRM')} loading={isLoading} onPress={handleConfirm} />
        <Button
          color="primary.700"
          label={t('SHOP_DETAIL.REDEEM.MODAL_BUTTON_CANCEL')}
          onPress={handleCancel}
          variant="outline"
        />
      </Styled.ButtonContainer>
    </BlurredModal>
  );
};

export default RedeemModal;
