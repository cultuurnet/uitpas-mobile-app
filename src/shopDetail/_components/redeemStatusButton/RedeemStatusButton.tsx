import { forwardRef } from 'react';
import { useTranslation } from 'react-i18next';
import { View } from 'react-native';

import { Button } from '../../../_components';
import { TApiError } from '../../../_http';
import { useHasFamilyMembers } from '../../../onboarding/family/_queries';
import { TReward } from '../../../shop/_models/reward';
import { TRedeemStatus } from '../../_models/redeemStatus';
import { RedeemStatusError } from '../redeemStatusError/RedeemStatusError';
import * as Styled from './style';

type TProps = {
  error: TApiError;
  isLoading: boolean;
  onPress: () => void;
  refetch: () => void;
  reward: TReward | null;
  status: TRedeemStatus | null;
  trackError: () => void;
};

/*
  When it's an online reward show either a redeembutton or the errormessage on why it's not redeemable
  Also show a loading indicator when it's an online reward
  When it's a physical reward, only show the errormessage on why it's not redeemable, no loader or no redeem button
*/
export const RedeemStatusButton = forwardRef<View, TProps>(
  ({ status, reward, error, isLoading, trackError, refetch, onPress }, ref) => {
    const { t } = useTranslation();
    const { data: hasFamilyMembers } = useHasFamilyMembers();

    if (reward?.online) {
      return (
        <Styled.RedeemContent>
          <View ref={ref}>
            {status?.redeemable || isLoading || hasFamilyMembers ? (
              <Button label={t('SHOP_DETAIL.REDEEM.BUTTON')} loading={isLoading} onPress={onPress} />
            ) : (
              <RedeemStatusError error={error} refetchStatus={refetch} status={status} track={trackError} />
            )}
          </View>
        </Styled.RedeemContent>
      );
    }

    if (!hasFamilyMembers && ((!status?.redeemable && !isLoading) || error)) {
      return (
        <Styled.RedeemContent>
          <View ref={ref}>
            <RedeemStatusError error={error} refetchStatus={refetch} status={status} track={trackError} />
          </View>
        </Styled.RedeemContent>
      );
    }

    return null;
  },
);
