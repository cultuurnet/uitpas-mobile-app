import styled from 'styled-components/native';

import { Typography } from '../../../_components';
import { theme } from '../../../_styles/theme';

export const Section = styled.View`
  margin-bottom: ${theme.common.defaultSpacing}px;
`;

export const SectionTitle = styled(Typography)`
  margin-bottom: 8px;
`;
