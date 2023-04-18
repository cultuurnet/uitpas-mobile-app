import React from 'react'
import { useTranslation } from 'react-i18next';
import { ScrollView } from 'react-native';

import { Accordion, ExternalLink, HtmlRenderer, Points, RewardImage, Typography } from '../_components';
import { TRootStackRouteProp } from '../_routing'
import { theme } from '../_styles/theme';
import { useGetReward } from '../shop/_queries/useGetReward';
import { Availability } from './_components/availability/Availability';
import { Organizer } from './_components/organizer/Organizer';
import { Section } from './_components/section/Section';
import * as Styled from './style';

type TProps = {
  route: TRootStackRouteProp<'ShopDetail'>;
}

export const ShopDetail = ({ route }: TProps) => {
  const { id, reward: fallbackReward } = route.params;
  const { data } = useGetReward({ id });
  const reward = data || fallbackReward;
  const { t } = useTranslation();

  const [firstOrganizer, ...organizers] = reward?.organizers || [];
  return (
    <ScrollView contentContainerStyle={{ backgroundColor: theme.palette.neutral['0'] }}>
      <Styled.ImageContainer>
        <RewardImage largeSpacing picture={reward.pictures?.[0]}>
          <Styled.PointContainer><Points large points={reward.points} theme="white" /></Styled.PointContainer>
        </RewardImage>
      </Styled.ImageContainer>
      <Styled.Content>
        <Typography fontStyle='bold' size='xxlarge'>{reward.title}</Typography>
        <Styled.Organizer color="primary.800">{firstOrganizer.name}</Styled.Organizer>

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
              {organizers.map((organizer) => <Organizer id={organizer.id} key={organizer.id} />)}
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
    </ScrollView>
  )
}
