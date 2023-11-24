import styled from 'styled-components/native';

import { Button, Typography } from '../../../../_components';

export const UnredeemableStatus = styled(Typography)`
  text-decoration: underline;
  text-decoration-color: ${({ theme }) => theme.palette.primary['700']};
`;

export const RedeemButton = styled(Button)`
  padding: 8px 16px;
`;
