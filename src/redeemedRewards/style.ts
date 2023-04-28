import styled from 'styled-components/native';

import { Typography } from '../_components';
import { theme } from '../_styles/theme';

export const Separator = styled.View`
  border: 1px solid ${theme.palette.neutral[100]};
`;

export const NoContentText = styled(Typography)`
  padding: ${theme.common.defaultSpacing}px;
`;

export const FooterLoadingContainer = styled.View`
  height: 40px;
  align-items: center;
  justify-content: center;
`;
