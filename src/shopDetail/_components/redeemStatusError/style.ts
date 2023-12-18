import styled from 'styled-components/native';

import { Typography } from '../../../_components';
import { theme } from '../../../_styles/theme';

export const RedeemError = styled.View`
  padding: ${theme.common.defaultSpacing}px;
  background-color: ${theme.palette.error[500]};
  border-radius: 8px;
`;

export const GenericRedeemError = styled.View`
  padding: ${theme.common.defaultSpacing}px;
  background-color: ${theme.palette.neutral[100]};
  border-radius: 8px;
  flex-direction: row;
`;

export const GenericRedeemErrorText = styled(Typography)`
  flex: 1;
`;
