import styled from 'styled-components/native';

import { Typography } from '../_components';
import { theme } from '../_styles/theme';

export const ImageContainer = styled.View`
  height: 200px;
  width: 100%;
  position: relative;
`;

export const Content = styled.View`
  padding: ${theme.common.defaultSpacing}px;
`;

export const PointContainer = styled.View`
  flex-direction: row;
`;

export const Organizer = styled(Typography)`
  margin-bottom: 24px;
`;
