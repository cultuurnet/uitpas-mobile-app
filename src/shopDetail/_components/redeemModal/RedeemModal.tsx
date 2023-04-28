import React, { FC, useCallback } from 'react';
import { useNavigation } from '@react-navigation/native'
import { t } from 'i18next';

import { BlurredModal, Button, Trans, Typography } from '../../../_components';
import { TRootStackNavigationProp } from '../../../_routing'
import { getLanguage } from '../../../_utils/languageHelpers';
import { useActiveCard } from '../../../profile/_queries/useActiveCard';
import { useRedeemReward } from '../../_queries/useRedeemReward';
import * as Styled from './style';

type TRedeemModalProps = {
  isVisible: boolean;
  points: number;
  rewardId: string;
  title: string;
  toggleIsVisible: () => void;
};

const RedeemModal: FC<TRedeemModalProps> = ({ isVisible, toggleIsVisible, rewardId, points, title }) => {
  const { navigate } = useNavigation<TRootStackNavigationProp<'ShopDetail'>>();

  const { mutate: redeemReward, isLoading, error } = useRedeemReward({
    onSuccess: (redeemedReward) => {
      toggleIsVisible();
      navigate('RedeemedReward', { redeemedReward });
    }
  });
  const activeCard = useActiveCard();

  const handleConfirm = useCallback(() => {
    redeemReward({ rewardId: rewardId, uitpasNumber: activeCard.uitpasNumber })
  }, [rewardId, redeemReward, activeCard.uitpasNumber]);

  return (
    <BlurredModal isVisible={isVisible} toggleIsVisible={toggleIsVisible}>
      <Typography bottomSpacing='12px' fontStyle="bold" size="xlarge">
        {t('SHOP_DETAIL.REDEEM.MODAL_TITLE')}
      </Typography>
      <Trans i18nKey="SHOP_DETAIL.REDEEM.MODAL_DESCRIPTION" values={{ points, title }} />
      {!!error && <Typography bottomSpacing='12px' color="error.500" size="small" topSpacing='12px'>{error?.endUserMessage?.[getLanguage()]}</Typography>}
      <Styled.ButtonContainer>
        <Styled.FirstButton label={t('SHOP_DETAIL.REDEEM.MODAL_BUTTON_CONFIRM')} loading={isLoading} onPress={handleConfirm} />
        <Button color="primary.700" label={t('SHOP_DETAIL.REDEEM.MODAL_BUTTON_CANCEL')} onPress={toggleIsVisible} variant='outline' />
      </Styled.ButtonContainer>
    </BlurredModal>
  );
};

export default RedeemModal;
