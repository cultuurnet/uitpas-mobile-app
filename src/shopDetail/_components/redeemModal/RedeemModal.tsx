import React, { FC, useCallback, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { t } from 'i18next';

import { BlurredModal, Button, Trans, Typography } from '../../../_components';
import { queryClient, useTracking } from '../../../_context';
import { TRootStackNavigationProp } from '../../../_routing';
import { getLanguage, getRewardTrackingData, getUpActionTrackingData } from '../../../_utils';
import { useHasFamilyMembers } from '../../../onboarding/family/_queries';
import { getActiveCard } from '../../../profile/_helpers/getActiveCard';
import { TFamilyMember } from '../../../profile/_models';
import { TRedeemedReward } from '../../../redeemedRewards/_models/redeemedReward';
import { TReward } from '../../../shop/_models/reward';
import { useRedeemReward } from '../../_queries/useRedeemReward';
import { FamilyMemberCard } from '../familyMemberCard/FamilyMemberCard';
import * as Styled from './style';

type TRedeemModalProps = { isVisible: boolean; member: TFamilyMember | null; reward: TReward; toggleIsVisible: () => void };

const RedeemModal: FC<TRedeemModalProps> = ({ member, reward, isVisible, toggleIsVisible }) => {
  const { navigate } = useNavigation<TRootStackNavigationProp<'ShopDetail'>>();
  const rewardTrackingData = getRewardTrackingData(reward);
  const pendingNavigation = React.useRef<{ member: TFamilyMember | null; redeemedReward: TRedeemedReward | null } | null>(null);

  const { data: hasFamilyMembers } = useHasFamilyMembers();
  const {
    mutate: redeemReward,
    isPending,
    error,
  } = useRedeemReward({
    onSuccess: redeemedReward => {
      pendingNavigation.current = { member, redeemedReward };

      queryClient.invalidateQueries({ queryKey: ['family'] });
      queryClient.invalidateQueries({ queryKey: ['redeem-status', reward.id] });
      toggleIsVisible();
    },
  });

  const handleModalDismissed = useCallback(() => {
    if (!pendingNavigation.current) return;
    const { member, redeemedReward } = pendingNavigation.current;
    pendingNavigation.current = null;

    navigate('RedeemedReward', { isModal: true, member, redeemedReward });
  }, [pendingNavigation, navigate]);
  const activeCard = getActiveCard({ passHolder: member?.passholder });
  const { trackSelfDescribingEvent } = useTracking();

  useEffect(() => {
    if (!error) return;
    trackSelfDescribingEvent(
      'errorMessage',
      { message: error?.type.substring(0, 100) },
      { reward: rewardTrackingData, up_action: getUpActionTrackingData('redeem-reward', reward, member) },
    );
  }, [error, trackSelfDescribingEvent, rewardTrackingData, member, reward]);

  const handleConfirm = useCallback(() => {
    trackSelfDescribingEvent('buttonClick', { button_name: 'redeem-confirm' }, { reward: rewardTrackingData });
    redeemReward({ body: { rewardId: reward.id, uitpasNumber: activeCard?.uitpasNumber } });
  }, [reward, redeemReward, activeCard?.uitpasNumber, trackSelfDescribingEvent, rewardTrackingData]);

  const handleCancel = () => {
    trackSelfDescribingEvent('buttonClick', { button_name: 'redeem-cancel' }, { reward: rewardTrackingData });
    toggleIsVisible();
  };

  return (
    <BlurredModal isVisible={isVisible} onDismiss={handleModalDismissed} toggleIsVisible={handleCancel}>
      <Typography bottomSpacing="12px" fontStyle="bold" size="xlarge">
        {t('SHOP_DETAIL.REDEEM.MODAL_TITLE')}
      </Typography>
      <Trans i18nKey="SHOP_DETAIL.REDEEM.MODAL_DESCRIPTION" values={{ count: reward.points, title: reward.title }} />
      {!!error && (
        <Typography bottomSpacing="12px" color="error.500" size="small" topSpacing="12px">
          {error?.endUserMessage?.[getLanguage()] || t('SHOP_DETAIL.REDEEM.MODAL_GENERIC_ERROR')}
        </Typography>
      )}
      {hasFamilyMembers && member && (
        <Styled.MemberContainer>
          <FamilyMemberCard member={member} title={t('SHOP_DETAIL.REDEEM.MODAL_WHO_TITLE')} />
        </Styled.MemberContainer>
      )}
      <Styled.ConfirmButton label={t('SHOP_DETAIL.REDEEM.MODAL_BUTTON_CONFIRM')} loading={isPending} onPress={handleConfirm} />
      <Button color="primary.700" label={t('SHOP_DETAIL.REDEEM.MODAL_BUTTON_CANCEL')} onPress={handleCancel} variant="outline" />
    </BlurredModal>
  );
};

export default RedeemModal;
