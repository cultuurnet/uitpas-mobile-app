import styled from 'styled-components/native';

import { Typography } from '../_components';
import { theme } from '../_styles/theme';

export const Header = styled(Typography)`
  margin: ${theme.common.defaultSpacing}px;
  margin-top: 24px;
`;

export const Separator = styled.View`
  border-width: 1px;
  border-color: ${theme.palette.neutral[100]};
`;

export const NoContentText = styled(Typography)`
  padding: 0 16px;
`;

export const FooterLoadingContainer = styled.View`
  height: 40px;
  align-items: center;
  justify-content: center;
`;
