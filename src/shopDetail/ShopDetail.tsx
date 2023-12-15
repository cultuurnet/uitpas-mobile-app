import React, { useCallback, useMemo, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ScrollView, View } from 'react-native';

import { Accordion, Analytics, HtmlRenderer, Points, RewardImage, Trans, Typography } from '../_components';
import { useTracking } from '../_context';
import { useToggle } from '../_hooks';
import { TRootStackRouteProp } from '../_routing';
import { getRewardTrackingData, normalizeUrl } from '../_utils';
import { useGetFamilyMembers, useHasFamilyMembers } from '../onboarding/family/_queries';
import { TFamilyMember } from '../profile/_models';
import { useGetMe } from '../profile/_queries/useGetMe';
import CardModal from '../profile/UitpasCards/CardModal/CardModal';
import { useGetReward } from '../shop/_queries/useGetReward';
import { Availability } from './_components/availability/Availability';
import { Organizer } from './_components/organizer/Organizer';
import { RedeemFamilyMembers } from './_components/redeemFamilyMembers/RedeemFamilyMembers';
import RedeemModal from './_components/redeemModal/RedeemModal';
import { RedeemStatusButton } from './_components/redeemStatusButton/RedeemStatusButton';
import { Section } from './_components/section/Section';
import { useGetRedeemStatus } from './_queries/useGetRedeemStatus';
import * as Styled from './style';

type TProps = {
  route: TRootStackRouteProp<'ShopDetail'>;
};

export const ShopDetail = ({ route }: TProps) => {
  const { id, reward: fallbackReward, showFamilyMembers = true } = route.params;
  const { data: me } = useGetMe();
  const { data } = useGetReward({ id });
  const reward = data || fallbackReward;
  const {
    data: redeemStatus,
    isLoading: isRedeemStatusLoading,
    error: redeemStatusError,
    refetch: refetchRedeemStatus,
  } = useGetRedeemStatus({ passHolder: me, rewardId: reward.id });
  const { data: familyMembers = [] } = useGetFamilyMembers();
  const { data: hasFamilyMembers } = useHasFamilyMembers();
  const [selectedMember, setSelectedMember] = useState<TFamilyMember>();
  const [isRedeemModalVisible, toggleIsRedeemModalVisible] = useToggle(false);
  const [isCardModalVisible, toggleIsCardModalVisible] = useToggle(false);
  const { t } = useTranslation();
  const { trackSelfDescribingEvent } = useTracking();
  const scrollViewRef = useRef(null);
  const redeemButtonRef = useRef(null);
  const rewardsSection = useRef(null);
  const rewardTrackingData = useMemo(() => getRewardTrackingData(reward), [reward]);

  const [firstOrganizer, ...organizers] = reward.organizers || [];
  const isInAppRedeemable = reward?.online && redeemStatus?.redeemable;
  // If we have a redeembutton, it needs to be sticky, otherwise we don't have sticky content
  const stickyHeaderIndices = isInAppRedeemable ? [2] : [];

  const handleLinkPress = () => {
    trackSelfDescribingEvent('linkClick', { targetUrl: normalizeUrl(reward.moreInfoURL) }, { reward: rewardTrackingData });
  };
  const trackError = () => {
    trackSelfDescribingEvent('errorMessage', { message: redeemStatus.reason }, { reward: rewardTrackingData });
  };

  const handleRedeemButtonPress = () => {
    if (!showFamilyMembers || !hasFamilyMembers) {
      const mainMember = familyMembers.filter(({ mainFamilyMember }) => mainFamilyMember)[0];
      if (mainMember) {
        handleRedeemReward(mainMember);
      }
    } else {
      rewardsSection.current?.measureLayout(scrollViewRef.current, (_x, yInScrollView) => {
        redeemButtonRef.current?.measure((_x, _y, _width, stickyAreaHeight) => {
          scrollViewRef.current?.scrollTo({ animated: true, y: yInScrollView - stickyAreaHeight });
        });
      });
    }
  };

  const handleRedeemReward = useCallback(
    (member: TFamilyMember) => {
      trackSelfDescribingEvent('buttonClick', { button_name: 'redeem-cta' }, { reward: rewardTrackingData });
      setSelectedMember(member);
      toggleIsRedeemModalVisible();
    },
    [rewardTrackingData, toggleIsRedeemModalVisible, trackSelfDescribingEvent],
  );

  const handleRedeemModalToggle = () => {
    setSelectedMember(null);
    toggleIsRedeemModalVisible();
  };

  return (
    <>
      <Analytics data={{ reward: rewardTrackingData }} screenName="reward" />
      <ScrollView ref={scrollViewRef} stickyHeaderIndices={stickyHeaderIndices}>
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

        <RedeemStatusButton
          error={redeemStatusError}
          isLoading={isRedeemStatusLoading}
          onPress={handleRedeemButtonPress}
          ref={redeemButtonRef}
          refetch={refetchRedeemStatus}
          reward={reward}
          status={redeemStatus}
          trackError={trackError}
        />

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
              i18nKey={
                reward.online
                  ? 'SHOP_DETAIL.COLLECT_ONLINE'
                  : `SHOP_DETAIL.COLLECT_OFFLINE_${!hasFamilyMembers ? 'SINGLE' : 'FAMILY'}`
              }
              onButtonPress={toggleIsCardModalVisible}
              selectable
              size="small"
            />
            <HtmlRenderer source={{ html: reward.practicalInfo }} />
          </Section>

          {showFamilyMembers && hasFamilyMembers && !isRedeemStatusLoading && redeemStatus?.redeemable && !redeemStatusError && (
            <View ref={rewardsSection}>
              <Section title={t('SHOP_DETAIL.WHO_CAN_REDEEM.TITLE')}>
                <RedeemFamilyMembers onRedeem={handleRedeemReward} reward={reward} />
              </Section>
            </View>
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
      <CardModal isVisible={isCardModalVisible} passHolder={me} toggleIsVisible={toggleIsCardModalVisible} />
      <RedeemModal
        isVisible={isRedeemModalVisible}
        member={selectedMember}
        reward={reward}
        toggleIsVisible={handleRedeemModalToggle}
      />
    </>
  );
};
