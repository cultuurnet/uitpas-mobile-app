import styled from 'styled-components/native';

import { ExternalLink } from '../_components';
import { InAppRewardLabel as RewardLabel } from '../_components/reward/InAppRewardLabel';
import Typography from '../_components/typography/Typography';
import { theme } from '../_styles/theme';
import { RewardsSection } from '../shop/_components/rewardsSection/RewardsSection';

export const ImageContainer = styled.View`
  height: 200px;
  width: 100%;
  position: relative;
`;

export const Content = styled.View`
  padding: ${theme.common.defaultSpacing}px;
  padding-bottom: 0px;
  background-color: ${theme.palette.neutral[0]};
`;

export const Title = styled(Typography)`
  line-height: 28px;
`;

export const MoreInfoLink = styled(ExternalLink)`
  margin-bottom: ${theme.common.defaultSpacing}px;
`;

export const PointContainer = styled.View`
  flex-direction: row;
`;

export const InAppRewardLabel = styled(RewardLabel)`
  margin-bottom: 24px;
  margin-left: 0;
`;

export const RelatedRewards = styled(RewardsSection)`
  margin: 24px 0;
`;
