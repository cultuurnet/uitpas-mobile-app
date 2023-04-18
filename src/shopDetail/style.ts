import styled from 'styled-components/native';

import { Typography } from '../_components';
import { InAppRewardLabel as RewardLabel } from '../_components/reward/InAppRewardLabel';
import { theme } from '../_styles/theme';

export const ImageContainer = styled.View`
  height: 200px;
  width: 100%;
  position: relative;
`;

export const Content = styled.View`
  padding: ${theme.common.defaultSpacing}px;
  background-color: ${theme.palette.neutral[0]};
  margin-bottom: 24px;
`;

export const PointContainer = styled.View`
  flex-direction: row;
`;

export const Organizer = styled(Typography)`
  margin-bottom: 24px;
`;

export const InAppRewardLabel = styled(RewardLabel)`
  margin-bottom: 24px;
  margin-left: 0;
`;
