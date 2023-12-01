import React, { FC, useCallback, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { t } from 'i18next';

import { BlurredModal, Button, Trans, Typography } from '../../../_components';
import { useTracking } from '../../../_context';
import { TRootStackNavigationProp } from '../../../_routing';
import { getAvatarByNameOrDefault, getLanguage, getRewardTrackingData } from '../../../_utils';
import { TFamilyMember } from '../../../profile/_models';
import { TReward } from '../../../shop/_models/reward';
import { useRedeemReward } from '../../_queries/useRedeemReward';
import * as Styled from './style';
import { useHasFamilyMembers } from '../../../onboarding/family/_queries';

type TRedeemModalProps = {
  isVisible: boolean;
  member: TFamilyMember | null;
  reward: TReward;
  toggleIsVisible: () => void;
};

const RedeemModal: FC<TRedeemModalProps> = ({ member, reward, isVisible, toggleIsVisible }) => {
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
  const { data: hasFamilyMembers } = useHasFamilyMembers();
  const [firstActiveCard] =
    member?.passholder?.cardSystemMemberships?.filter?.(card => card.status === 'ACTIVE' && card.uitpasNumber) ?? [];
  const { trackSelfDescribingEvent } = useTracking();

  useEffect(() => {
    if (!error) return;
    trackSelfDescribingEvent('errorMessage', { message: error?.type }, { reward: rewardTrackingData });
  }, [error, trackSelfDescribingEvent, rewardTrackingData]);

  const handleConfirm = useCallback(() => {
    trackSelfDescribingEvent('buttonClick', { button_name: 'redeem-confirm' }, { reward: rewardTrackingData });
    redeemReward({ body: { rewardId: reward.id, uitpasNumber: firstActiveCard?.uitpasNumber } });
  }, [reward, redeemReward, firstActiveCard?.uitpasNumber, trackSelfDescribingEvent, rewardTrackingData]);

  const handleCancel = () => {
    trackSelfDescribingEvent('buttonClick', { button_name: 'redeem-cancel' }, { reward: rewardTrackingData });
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
      {hasFamilyMembers && member && (
        <Styled.MemberContainer>
          <Typography fontStyle="bold">{t('SHOP_DETAIL.REDEEM.MODAL_WHO_TITLE')}</Typography>
          <Styled.MemberCard>
            <Styled.MemberAvatar resizeMode="contain" source={getAvatarByNameOrDefault(member.icon)} />
            <Styled.MemberBody>
              <Typography fontStyle="bold" numberOfLines={1}>
                {member.passholder.firstName}
                {member.mainFamilyMember ? ` ${t('SHOP_DETAIL.WHO_CAN_REDEEM.YOU')}` : ''}
              </Typography>
              <Typography color="primary.700" fontStyle="semibold" numberOfLines={1} size="small">
                {t('SHOP_DETAIL.WHO_CAN_REDEEM.POINTS', { count: member.passholder.points })}
              </Typography>
            </Styled.MemberBody>
          </Styled.MemberCard>
        </Styled.MemberContainer>
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
