import React from 'react'
import { useTranslation } from 'react-i18next';
import { ScrollView } from 'react-native';

import { ExternalLink, HtmlRenderer, Points, RewardImage, Typography } from '../_components';
import { TRootStackRouteProp } from '../_routing'
import { useGetReward } from '../shop/_queries/useGetReward';
import { Availability } from './_components/availability/Availability';
import { Section } from './_components/section/Section';
import { useGetOrganizer } from './_queries/useGetOrganizer';
import * as Styled from './style';

type TProps = {
  route: TRootStackRouteProp<'ShopDetail'>;
}

export const ShopDetail = ({ route }: TProps) => {
  const { id, reward: fallbackReward } = route.params;
  const { data } = useGetReward({ id });
  const reward = data || fallbackReward;
  const { data: organizer } = useGetOrganizer({ id: reward.organizers[0].id });
  console.log(organizer);
  const { t } = useTranslation();

  return (
    <ScrollView>
      <Styled.ImageContainer>
        <RewardImage largeSpacing picture={reward.pictures?.[0]}>
          <Styled.PointContainer><Points large points={reward.points} theme="white" /></Styled.PointContainer>
        </RewardImage>
      </Styled.ImageContainer>
      <Styled.Content>
        <Typography fontStyle='bold' size='xxlarge'>{reward.title}</Typography>
        <Styled.Organizer color="primary.800">{reward.organizers[0].name}</Styled.Organizer>

        <Section title={t('SHOP_DETAIL.DESCRIPTION')}>
          <HtmlRenderer source={{ html: reward.promotionalDescription }} />
        </Section>

        {!!reward.moreInfoURL && <Section title={t('SHOP_DETAIL.MORE_INFO')}>
          <ExternalLink href={reward.moreInfoURL} />
        </Section>}

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
