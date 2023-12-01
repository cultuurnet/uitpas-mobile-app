import React, { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { Image, ScrollView, View } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';

import { GiftOpen } from '../_assets/images';
import { EnlargedHeader, HtmlRenderer, Trans, Typography } from '../_components';
import { useTracking } from '../_context';
import { TRootStackNavigationProp, TRootStackRouteProp } from '../_routing';
import { formatISOString, getAvatarByNameOrDefault, getRewardTrackingData } from '../_utils';
import { useHasFamilyMembers } from '../onboarding/family/_queries';
import { RewardCard } from './_components/rewardCard/RewardCard';
import * as Styled from './style';

type TProps = {
  navigation: TRootStackNavigationProp<'RedeemedReward'>;
  route: TRootStackRouteProp<'RedeemedReward'>;
};

const RedeemedReward = ({ route, navigation }: TProps) => {
  const { t } = useTranslation();
  const { trackSelfDescribingEvent } = useTracking();
  const { data: hasFamilyMembers } = useHasFamilyMembers();
  const { redeemedReward, member, isModal } = route.params || {};

  useFocusEffect(
    useCallback(() => {
      if (!isModal) return;
      if (!redeemedReward) return;

      trackSelfDescribingEvent(
        'successMessage',
        { message: 'reward-redemeed' },
        { reward: getRewardTrackingData(redeemedReward.reward) },
      );
    }, [trackSelfDescribingEvent, isModal, redeemedReward]),
  );

  if (!redeemedReward) return null;

  function handleLinkPress() {
    trackSelfDescribingEvent(
      'linkClick',
      { targetUrl: redeemedReward.redeemInfo.link },
      {
        reward: getRewardTrackingData(redeemedReward.reward),
      },
    );
  }

  return (
    <ScrollView>
      <EnlargedHeader height={isModal ? 244 : 84} />
      <Styled.Content>
        {isModal && (
          <Styled.SuccessContainer>
            {!hasFamilyMembers ? (
              <Image source={GiftOpen} />
            ) : (
              <View>
                <Styled.MemberAvatar source={getAvatarByNameOrDefault(member.icon)} />
                <Styled.MemberAvatarLine style={{ transform: [{ rotate: '-25deg' }] }} />
                <Styled.MemberAvatarLine />
                <Styled.MemberAvatarLine style={{ transform: [{ rotate: '25deg' }] }} />
              </View>
            )}
            <Styled.SuccessContent>
              <Typography bottomSpacing="8px" color="neutral.0" fontStyle="bold" size="large">
                {t('REDEEMED_REWARD.SUCCESS_TITLE')}
              </Typography>
              <Trans
                color="neutral.0"
                i18nKey="REDEEMED_REWARD.SUCCESS_MESSAGE"
                onButtonPress={() => {
                  navigation.reset({
                    index: 0,
                    routes: [{ name: 'MainNavigator', params: { screen: 'Profile' } }, { name: 'RedeemedRewards' }],
                  });
                }}
                size="small"
                values={{ points: redeemedReward.reward.points }}
                variant="light"
              />
            </Styled.SuccessContent>
          </Styled.SuccessContainer>
        )}

        <RewardCard isButton={!isModal} reward={redeemedReward?.reward} />

        <Trans
          bottomSpacing="8px"
          i18nKey="REDEEMED_REWARD.TRADED_AT"
          values={{ date: formatISOString(redeemedReward.redeemDate, 'dd/MM/yyyy') }}
        />

        {!!redeemedReward?.redeemInfo?.text && (
          <HtmlRenderer fontSize={16} onLinkPress={handleLinkPress} source={{ html: redeemedReward.redeemInfo.text }} />
        )}

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
            <Styled.LinkInlineButton
              href={redeemedReward.redeemInfo.link}
              label={redeemedReward?.redeemInfo?.label}
              onPress={handleLinkPress}
            />
          ) : (
            <Styled.LinkButton href={redeemedReward.redeemInfo.link} onPress={handleLinkPress}>
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
