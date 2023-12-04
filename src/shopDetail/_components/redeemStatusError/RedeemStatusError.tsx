import { useTranslation } from 'react-i18next';

import { Button, Typography } from '../../../_components';
import { TApiError } from '../../../_http';
import { getLanguage } from '../../../_utils';
import { TRedeemStatus } from '../../_models/redeemStatus';
import * as Styled from './style';

type TProps = {
  error: TApiError;
  refetchStatus: () => void;
  status: TRedeemStatus;
  track: () => void;
};

export const RedeemStatusError = ({ status, error, track, refetchStatus }: TProps) => {
  const { t } = useTranslation();

  const errorMessage = status?.message || error?.endUserMessage?.[getLanguage()];

  if (!errorMessage) {
    return (
      <Styled.GenericRedeemError>
        <Styled.GenericRedeemErrorText color="neutral.600">{t('SHOP_DETAIL.GENERIC_REDEEM_ERROR')}</Styled.GenericRedeemErrorText>
        <Button label={t('SHOP_DETAIL.RETRY')} onPress={refetchStatus} />
      </Styled.GenericRedeemError>
    );
  }

  track();

  return (
    <Styled.RedeemError>
      <Typography color="neutral.0">{errorMessage}</Typography>
    </Styled.RedeemError>
  );
};
