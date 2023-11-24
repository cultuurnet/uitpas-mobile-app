import React, { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { ScrollView } from 'react-native';

import { Accordion, Analytics, Button, HtmlRenderer, Points, RewardImage, Trans, Typography } from '../_components';
import { useTracking } from '../_context';
import { useToggle } from '../_hooks';
import { TRootStackRouteProp } from '../_routing';
import { getLanguage, getRewardTrackingData, normalizeUrl } from '../_utils';
import { useHasFamilyMembers } from '../onboarding/family/_queries';
import { useGetMe } from '../profile/_queries/useGetMe';
import CardModal from '../profile/UitpasCards/CardModal/CardModal';
import { useGetReward } from '../shop/_queries/useGetReward';
import { Availability } from './_components/availability/Availability';
import { Organizer } from './_components/organizer/Organizer';
import { RedeemFamilyMembers } from './_components/redeemFamilyMembers/RedeemFamilyMembers';
import RedeemModal from './_components/redeemModal/RedeemModal';
import { Section } from './_components/section/Section';
import { useGetRedeemStatus } from './_queries/useGetRedeemStatus';
import * as Styled from './style';

type TProps = {
  route: TRootStackRouteProp<'ShopDetail'>;
};

export const ShopDetail = ({ route }: TProps) => {
  const { id, reward: fallbackReward } = route.params;
  const { data: passHolder } = useGetMe();
  const { data } = useGetReward({ id });
  const reward = data || fallbackReward;
  const {
    data: redeemStatus,
    isLoading: isRedeemStatusLoading,
    error: redeemError,
    refetch: refetchRedeemStatus,
  } = useGetRedeemStatus({ passHolder, rewardId: reward.id });
  const hasFamilyMembers = useHasFamilyMembers();
  const [isRedeemModalConfirmationOpen, toggleRedeemModalConfirmationOpen] = useToggle(false);
  const [cardModalVisible, toggleCardModalVisible] = useToggle(false);
  const { t } = useTranslation();
  const { trackSelfDescribingEvent } = useTracking();
  const rewardTrackingData = getRewardTrackingData(reward);

  const [firstOrganizer, ...organizers] = reward?.organizers || [];

  const isInAppRedeemable = reward?.online && redeemStatus?.redeemable;
  // If we have a redeembutton, it needs to be sticky, otherwise we don't have sticky content
  const stickyHeaderIndices = isInAppRedeemable ? [2] : [];

  const handleLinkPress = () => {
    trackSelfDescribingEvent('linkClick', { targetUrl: normalizeUrl(reward.moreInfoURL) }, { reward: rewardTrackingData });
  };

  const renderRedeemError = useCallback(() => {
    const errorMessage = redeemStatus?.message || redeemError?.endUserMessage?.[getLanguage()];
    if (!errorMessage) {
      return (
        <Styled.GenericRedeemError>
          <Styled.GenericRedeemErrorText color="neutral.600">
            {t('SHOP_DETAIL.GENERIC_REDEEM_ERROR')}
          </Styled.GenericRedeemErrorText>
          <Button label={t('SHOP_DETAIL.RETRY')} onPress={refetchRedeemStatus} />
        </Styled.GenericRedeemError>
      );
    }

    trackSelfDescribingEvent('errorMessage', { message: redeemStatus.reason }, { reward: rewardTrackingData });

    return (
      <Styled.RedeemError>
        <Typography color="neutral.0">{errorMessage}</Typography>
      </Styled.RedeemError>
    );
  }, [
    redeemStatus?.reason,
    redeemStatus?.message,
    redeemError?.endUserMessage,
    refetchRedeemStatus,
    t,
    trackSelfDescribingEvent,
    rewardTrackingData,
  ]);

  const renderRedeemStatus = useCallback(() => {
    /*
      When it's an online reward show either a redeembutton or the errormessage on why it's not redeemable
      Also show a loading indicator when it's an online reward
      When it's a physical reward, only show the errormessage on why it's not redeemable, no loader or no redeem button
    */
    if (reward?.online) {
      return (
        <Styled.RedeemContent>
          {redeemStatus?.redeemable || isRedeemStatusLoading ? (
            <Button
              label={t('SHOP_DETAIL.REDEEM.BUTTON')}
              loading={isRedeemStatusLoading}
              onPress={() => {
                trackSelfDescribingEvent('buttonClick', { button_name: 'redeem-cta' }, { reward: rewardTrackingData });
                toggleRedeemModalConfirmationOpen();
              }}
            />
          ) : (
            renderRedeemError()
          )}
        </Styled.RedeemContent>
      );
    }
    return (
      ((!redeemStatus?.redeemable && !isRedeemStatusLoading) || redeemError) && (
        <Styled.RedeemContent>{renderRedeemError()}</Styled.RedeemContent>
      )
    );
  }, [
    isRedeemStatusLoading,
    redeemError,
    redeemStatus?.redeemable,
    reward?.online,
    t,
    toggleRedeemModalConfirmationOpen,
    renderRedeemError,
    trackSelfDescribingEvent,
    rewardTrackingData,
  ]);

  return (
    <>
      <Analytics data={{ reward: rewardTrackingData }} screenName="reward" />
      <ScrollView stickyHeaderIndices={stickyHeaderIndices}>
        <Styled.ImageContainer>
          <RewardImage largeSpacing picture={reward.pictures?.[0]}>
            {!!reward.points && (
              <Styled.PointContainer>
                <Points large points={reward.points} theme="white" />
              </Styled.PointContainer>
            )}
          </RewardImage>
        </Styled.ImageContainer>
        <Styled.Content>
          <Styled.Title fontStyle="bold" size="xxlarge">
            {reward.title}
          </Styled.Title>
          <Typography color="primary.800">{firstOrganizer?.name}</Typography>
        </Styled.Content>

        {renderRedeemStatus()}

        <Styled.Content>
          <Section title={t('SHOP_DETAIL.DESCRIPTION')}>
            <HtmlRenderer onLinkPress={handleLinkPress} source={{ html: reward.promotionalDescription }} />
          </Section>

          {!!reward.moreInfoURL && <Styled.MoreInfoLink href={normalizeUrl(reward.moreInfoURL)} onPress={handleLinkPress} />}

          <Section title={t('SHOP_DETAIL.LOCATION')}>
            <Organizer fallbackName={firstOrganizer?.name} id={firstOrganizer?.id} key={firstOrganizer?.id} />
            {organizers.length > 0 && (
              <Accordion expandedTitle={t('SHOP_DETAIL.SHOW_LESS')} title={t('SHOP_DETAIL.SHOW_MORE')}>
                {organizers.map(organizer => (
                  <Organizer fallbackName={organizer.name} id={organizer.id} key={organizer.id} showTopBorder />
                ))}
              </Accordion>
            )}
          </Section>

          <Availability
            maxAvailableUnits={reward.maxAvailableUnits}
            redeemConstraint={reward.redeemConstraint}
            redeemPeriod={reward.redeemPeriod}
            unitsTaken={reward.unitsTaken}
          />

          <Section title={t('SHOP_DETAIL.HOW_TO_COLLECT')}>
            <Trans
              bottomSpacing="24px"
              i18nKey={reward.online ? 'SHOP_DETAIL.COLLECT_ONLINE' : 'SHOP_DETAIL.COLLECT_OFFLINE'}
              onButtonPress={toggleCardModalVisible}
              selectable
              size="small"
            />
            <HtmlRenderer source={{ html: reward.practicalInfo }} />
          </Section>

          {hasFamilyMembers && (
            <Section title={t('SHOP_DETAIL.WHO_CAN_REDEEM.TITLE')}>
              <RedeemFamilyMembers rewardId={reward.id} />
            </Section>
          )}
        </Styled.Content>

        <Styled.RelatedRewards
          filterRewardId={reward.id}
          hideMoreButton
          horizontal
          organizerId={reward?.organizers.map(organizer => organizer.id)}
          title={t('SHOP_DETAIL.OTHER_REWARDS')}
        />
      </ScrollView>
      <CardModal isVisible={cardModalVisible} passHolder={passHolder} toggleIsVisible={toggleCardModalVisible} />
      <RedeemModal
        isVisible={isRedeemModalConfirmationOpen}
        reward={reward}
        toggleIsVisible={toggleRedeemModalConfirmationOpen}
      />
    </>
  );
};
