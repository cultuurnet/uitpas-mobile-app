import React, { FC, useCallback, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { t } from 'i18next';

import { BlurredModal, Button, Trans, Typography } from '../../../_components';
import { useTracking } from '../../../_context';
import { TRewardContext } from '../../../_models';
import { TRootStackNavigationProp } from '../../../_routing';
import { getLanguage } from '../../../_utils/languageHelpers';
import { useActiveCard } from '../../../profile/_queries/useActiveCard';
import { TReward } from '../../../shop/_models/reward';
import { useRedeemReward } from '../../_queries/useRedeemReward';
import * as Styled from './style';

type TRedeemModalProps = {
  isVisible: boolean;
  reward: TReward;
  rewardContext: TRewardContext;
  toggleIsVisible: () => void;
};

const RedeemModal: FC<TRedeemModalProps> = ({ reward, isVisible, toggleIsVisible, rewardContext }) => {
  const { navigate } = useNavigation<TRootStackNavigationProp<'ShopDetail'>>();

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

    trackSelfDescribingEvent('errorMessage', { message: error?.type }, { reward: rewardContext });
  }, [error, trackSelfDescribingEvent, rewardContext]);

  const handleConfirm = useCallback(() => {
    trackSelfDescribingEvent('buttonClick', { button_name: 'redeem-confirm' }, { reward: rewardContext });
    redeemReward({ rewardId: reward.id, uitpasNumber: activeCard.uitpasNumber });
  }, [reward, redeemReward, activeCard.uitpasNumber, trackSelfDescribingEvent, rewardContext]);

  const handleCancel = () => {
    trackSelfDescribingEvent('buttonClick', { button_name: 'redeem-cancel' }, { reward: rewardContext });
    toggleIsVisible();
  };

  return (
    <BlurredModal isVisible={isVisible} toggleIsVisible={handleCancel}>
      <Typography bottomSpacing="12px" fontStyle="bold" size="xlarge">
        {t('SHOP_DETAIL.REDEEM.MODAL_TITLE')}
      </Typography>
      <Trans i18nKey="SHOP_DETAIL.REDEEM.MODAL_DESCRIPTION" values={{ points: reward.points, title: reward.title }} />
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
