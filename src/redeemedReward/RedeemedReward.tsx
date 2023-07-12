import React from 'react';
import { useTranslation } from 'react-i18next';
import { Image, ScrollView } from 'react-native';

import { GiftOpen } from '../_assets/images';
import { EnlargedHeader, HtmlRenderer, Trans, Typography } from '../_components';
import { TRootStackNavigationProp, TRootStackRouteProp } from '../_routing';
import { formatISOString } from '../_utils';
import { RewardCard } from './_components/rewardCard/RewardCard';
import * as Styled from './style';

type TProps = {
  navigation: TRootStackNavigationProp<'RedeemedReward'>;
  route: TRootStackRouteProp<'RedeemedReward'>;
};

const RedeemedReward = ({ route, navigation }: TProps) => {
  const { t } = useTranslation();
  const redeemedReward = route.params?.redeemedReward;
  const isModal = route.params?.isModal;
  if (!redeemedReward) return null;

  return (
    <ScrollView>
      <EnlargedHeader height={isModal ? 244 : 84} />
      <Styled.Content>
        {isModal && (
          <Styled.SuccessContainer>
            <Image source={GiftOpen} />
            <Styled.SuccessContent>
              <Typography bottomSpacing="8px" color="neutral.0" fontStyle="bold" size="large">
                {t('REDEEMED_REWARD.SUCCESS_TITLE')}
              </Typography>
              <Typography color="neutral.0" size="small">
                {t('REDEEMED_REWARD.SUCCESS_MESSAGE', { points: redeemedReward.reward.points })}
              </Typography>
            </Styled.SuccessContent>
          </Styled.SuccessContainer>
        )}

        <RewardCard isButton={!isModal} reward={redeemedReward?.reward} />

        <Trans
          bottomSpacing="8px"
          i18nKey="REDEEMED_REWARD.TRADED_AT"
          values={{ date: formatISOString(redeemedReward.redeemDate, 'dd/MM/yyyy') }}
        />

        {!!redeemedReward?.redeemInfo?.text && <HtmlRenderer fontSize={16} source={{ html: redeemedReward.redeemInfo.text }} />}

        {/* Added spacer because we can't set margin bottom on the HtmlRenderer */}
        <Styled.Spacer />

        {!!redeemedReward?.redeemCode && (
          <>
            <Typography bottomSpacing="16px" color="primary.800" fontStyle="bold">
              {t('REDEEMED_REWARD.YOUR_CODE')}
            </Typography>
            <Styled.CopyButton label={redeemedReward.redeemCode} />
          </>
        )}

        {/* Only show the link when it's available. When it's a charity reward, we show a link, otherwise we use a button  */}
        {!!redeemedReward?.redeemInfo?.link &&
          (redeemedReward.reward.categories.includes('Goede doel') ? (
            <Styled.LinkInlineButton href={redeemedReward.redeemInfo.link} label={redeemedReward?.redeemInfo?.label} />
          ) : (
            <Styled.LinkButton href={redeemedReward.redeemInfo.link}>
              <>
                <Typography color="neutral.0" fontStyle="bold">
                  {redeemedReward?.redeemInfo?.label}
                </Typography>
                <Styled.ExternalIcon color="neutral.0" name="External" size={14} />
              </>
            </Styled.LinkButton>
          ))}

        {isModal && (
          <Styled.CloseButton
            color="primary.700"
            label={t('REDEEMED_REWARD.GO_BACK')}
            onPress={() => navigation.pop()}
            variant="outline"
          />
        )}
      </Styled.Content>
    </ScrollView>
  );
};

export default RedeemedReward;
