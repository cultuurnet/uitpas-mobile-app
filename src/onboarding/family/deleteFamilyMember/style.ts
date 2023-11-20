import styled from 'styled-components/native';

import { Button, Typography } from '../../../_components';

export const Title = styled(Typography)`
  margin-bottom: 8px;
`;

export const DeleteButton = styled(Button)`
  margin-top: 32px;
  background-color: ${({ theme }) => theme.palette.error[700]};
`;
export const CloseButton = styled(Button)`
  margin-top: 16px;
`;
