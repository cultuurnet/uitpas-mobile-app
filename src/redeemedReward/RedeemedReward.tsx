import React from 'react'
import { useTranslation } from 'react-i18next';
import { Image, ScrollView } from 'react-native';

import { GiftOpen } from '../_assets/images';
import { Button, EnlargeHeader, HtmlRenderer, Trans, Typography } from '../_components';
import { TRootStackNavigationProp, TRootStackRouteProp } from '../_routing';
import { formatISOString } from '../_utils/dateHelpers';
import { RewardCard } from './_components/rewardCard/RewardCard';
import * as Styled from './style';

type TProps = {
  navigation: TRootStackNavigationProp<'RedeemedReward'>;
  route: TRootStackRouteProp<'RedeemedReward'>;
};

const RedeemedReward = ({ route, navigation }: TProps) => {
  const { t } = useTranslation();
  const redeemedReward = route.params?.redeemedReward;

  if (!redeemedReward) return null;

  return (
    <ScrollView>
      <EnlargeHeader height={84} />
      <Styled.Content>

        <RewardCard reward={redeemedReward?.reward} />

        <Styled.SuccessContainer>
          <Image source={GiftOpen} />
          <Styled.SuccessContent>
            <Typography bottomSpacing='8px' color="secondary.900" fontStyle='bold' size='large'>{t('REDEEMED_REWARD.SUCCESS_TITLE')}</Typography>
            <Typography color="secondary.900" size="small">{t('REDEEMED_REWARD.SUCCESS_MESSAGE', { points: redeemedReward.reward.points })}</Typography>
          </Styled.SuccessContent>
        </Styled.SuccessContainer>

        <Trans
          i18nKey='REDEEMED_REWARD.TRADED_AT'
          values={{ date: formatISOString(redeemedReward.redeemDate, 'dd/MM/yyyy') }}
        />

        <HtmlRenderer source={{ html: redeemedReward.redeemInfo.text }} />

        <Button color="primary.700" onPress={() => navigation.goBack()} variant="outline"></Button>
      </Styled.Content>
    </ScrollView>
  )
}

export default RedeemedReward;