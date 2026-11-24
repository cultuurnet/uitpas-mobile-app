import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

import { Button, Typography } from '../../../_components';
import { useStatusAnnouncement } from '../../../_hooks';
import { TApiError } from '../../../_http';
import { announceStatus, getLanguage } from '../../../_utils';
import { TRedeemStatus } from '../../_models/redeemStatus';
import * as Styled from './style';

type TProps = {
  error: TApiError;
  refetchStatus: () => Promise<{ data?: TRedeemStatus; error?: TApiError | null }>;
  status: TRedeemStatus;
  track: () => void;
};

export const RedeemStatusError = ({ status, error, track, refetchStatus }: TProps) => {
  const { t } = useTranslation();

  const errorMessage = status?.message || error?.endUserMessage?.[getLanguage()] || null;
  const announcement = errorMessage ?? t('SHOP_DETAIL.GENERIC_REDEEM_ERROR');
  useStatusAnnouncement(announcement);

  useEffect(() => {
    if (errorMessage) track();
  }, [errorMessage, track]);

  const handleRetry = async () => {
    const result = await refetchStatus();
    if (result?.data?.redeemable) return;

    const nextMessage =
      result?.data?.message || result?.error?.endUserMessage?.[getLanguage()] || t('SHOP_DETAIL.GENERIC_REDEEM_ERROR');
    if (nextMessage === announcement) announceStatus(nextMessage);
  };

  if (!errorMessage) {
    return (
      <Styled.GenericRedeemError>
        <Styled.GenericRedeemErrorText color="neutral.600">{t('SHOP_DETAIL.GENERIC_REDEEM_ERROR')}</Styled.GenericRedeemErrorText>
        <Button label={t('SHOP_DETAIL.RETRY')} onPress={handleRetry} />
      </Styled.GenericRedeemError>
    );
  }

  return (
    <Styled.RedeemError>
      <Typography color="neutral.0">{errorMessage}</Typography>
    </Styled.RedeemError>
  );
};
