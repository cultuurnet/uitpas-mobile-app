import React from 'react'
import { useTranslation } from 'react-i18next';
import { ScrollView } from 'react-native';

import { ExternalLink, RewardImage, Typography } from '../_components';
import HtmlRenderer from '../_components/htmlRenderer/HtmlRenderer';
import { Points } from '../_components/points/Points';
import { TRootStackRouteProp } from '../_routing'
import { useGetReward } from '../shop/_queries/useGetReward';
import { Section } from './Section';
import * as Styled from './style';

type TProps = {
  route: TRootStackRouteProp<'ShopDetail'>;
}

export const ShopDetail = ({ route }: TProps) => {
  const { id, reward: fallbackReward } = route.params;
  const { data } = useGetReward({ id });
  const reward = data || fallbackReward;

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

        {<Section title={t('SHOP_DETAIL.HOW_TO_COLLECT')}>
          <Typography size="small">{t(reward.online ? 'SHOP_DETAIL.COLLECT_ONLINE' : 'SHOP_DETAIL.COLLECT_OFFLINE')}</Typography>
          <HtmlRenderer source={{ html: reward.practicalInfo }} />
        </Section>}
      </Styled.Content>
    </ScrollView>
  )
}
