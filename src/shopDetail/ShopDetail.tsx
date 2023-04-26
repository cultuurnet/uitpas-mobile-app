import React from 'react'
import { useTranslation } from 'react-i18next';
import { ScrollView } from 'react-native';

import { Accordion, Button, ExternalLink, HtmlRenderer, Points, RewardImage, Typography } from '../_components';
import { useToggle } from '../_hooks';
import { TRootStackRouteProp } from '../_routing'
import { getLanguage } from '../_utils/languageHelpers';
import { useGetReward } from '../shop/_queries/useGetReward';
import { Availability } from './_components/availability/Availability';
import { Organizer } from './_components/organizer/Organizer';
import RedeemModal from './_components/redeemModal/RedeemModal';
import { Section } from './_components/section/Section';
import { useGetRedeemStatus } from './_queries/useGetRedeemStatus';
import * as Styled from './style';

type TProps = {
  route: TRootStackRouteProp<'ShopDetail'>;
}

export const ShopDetail = ({ route }: TProps) => {
  const { id, reward: fallbackReward } = route.params;
  const { data } = useGetReward({ id });
  const reward = data || fallbackReward;
  const { data: redeemStatus, isLoading: isRedeemStatusLoading, error: redeemError } = useGetRedeemStatus({ id: reward.id });
  const [isRedeemModalConfirmationOpen, toggleRedeemModalConfirmationOpen] = useToggle(false);
  const { t } = useTranslation();

  const [firstOrganizer, ...organizers] = reward?.organizers || [];

  const isInAppRedeemable = reward?.online && redeemStatus?.redeemable;
  // If we have a redeembutton, it needs to be sticky, otherwise we don't have sticky content
  const stickyHeaderIndices = isInAppRedeemable ? [2] : [];

  return (
    <>
      <ScrollView stickyHeaderIndices={stickyHeaderIndices}>
        <Styled.ImageContainer>
          <RewardImage largeSpacing picture={reward.pictures?.[0]}>
            {!!reward.points && <Styled.PointContainer><Points large points={reward.points} theme="white" /></Styled.PointContainer>}
          </RewardImage>
        </Styled.ImageContainer>
        <Styled.Content>
          <Styled.Title fontStyle='bold' size='xxlarge'>{reward.title}</Styled.Title>
          <Typography color="primary.800">{firstOrganizer.name}</Typography>
        </Styled.Content>

        {reward?.online && !isRedeemStatusLoading &&
          <Styled.RedeemContent>
            {redeemStatus?.redeemable ?
              <Button label={t('SHOP_DETAIL.REDEEM.BUTTON')} onPress={toggleRedeemModalConfirmationOpen} />
              :
              <Styled.RedeemError>
                <Typography color="neutral.0">{redeemStatus?.message || redeemError?.endUserMessage?.[getLanguage()]}</Typography>
              </Styled.RedeemError>
            }
          </Styled.RedeemContent>
        }

        <Styled.Content>
          <Section title={t('SHOP_DETAIL.DESCRIPTION')}>
            <HtmlRenderer source={{ html: reward.promotionalDescription }} />
          </Section>

          {!!reward.moreInfoURL && <Section title={t('SHOP_DETAIL.MORE_INFO')}>
            <ExternalLink href={reward.moreInfoURL} />
          </Section>}

          <Section title={t('SHOP_DETAIL.LOCATION')}>
            <Organizer id={firstOrganizer.id} key={firstOrganizer.id} />
            {organizers.length > 0 && (
              <Accordion expandedTitle={t('SHOP_DETAIL.SHOW_LESS')} title={t('SHOP_DETAIL.SHOW_MORE')}>
                {organizers.map((organizer) => <Organizer id={organizer.id} key={organizer.id} showTopBorder />)}
              </Accordion>
            )}
          </Section>

          <Availability
            maxAvailableUnits={reward.maxAvailableUnits}
            redeemConstraint={reward.redeemConstraint}
            redeemPeriod={reward.redeemPeriod}
            unitsTaken={reward.unitsTaken} />

          <Section title={t('SHOP_DETAIL.HOW_TO_COLLECT')}>
            <Typography size="small">{t(reward.online ? 'SHOP_DETAIL.COLLECT_ONLINE' : 'SHOP_DETAIL.COLLECT_OFFLINE')}</Typography>
            <HtmlRenderer source={{ html: reward.practicalInfo }} />
          </Section>

        </Styled.Content>
        <Styled.RelatedRewards filterRewardId={reward.id} hideMoreButton horizontal organizerId={reward?.organizers.map(organizer => organizer.id)} title={t('SHOP_DETAIL.OTHER_REWARDS')} />
      </ScrollView>
      <RedeemModal isVisible={isRedeemModalConfirmationOpen} points={reward?.points} rewardId={reward?.id} title={reward?.title} toggleIsVisible={toggleRedeemModalConfirmationOpen} />
    </>
  )
}
