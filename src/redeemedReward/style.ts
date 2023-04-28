import styled from 'styled-components/native';

import { theme } from '../_styles/theme';

export const Content = styled.View`
  padding: 0 ${theme.common.defaultSpacing}px;
`;

export const SuccessContainer = styled.View`
  flex-direction: row;
  align-items: center;
  padding: ${theme.common.defaultSpacing}px;
  background-color: ${theme.palette.secondary[200]};
  border: 1px solid ${theme.palette.secondary[300]};
  border-radius: 8px;
  margin-bottom: 24px;
`;

export const SuccessContent = styled.View`
  margin-left: ${theme.common.defaultSpacing}px;
  flex: 1;
`;
