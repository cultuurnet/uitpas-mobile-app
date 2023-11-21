import styled from 'styled-components/native';

import { Button, Typography } from '../../../_components';

export const Title = styled(Typography)`
  margin-bottom: 8px;
`;

export const DeleteButtonContainer = styled.View`
  flex-direction: row;
  justify-content: center;
  margin-top: 24px;
`;

export const DeleteButton = styled(Button)`
  margin-left: 8px;
`;

export const CloseButton = styled(Button)`
  margin-top: 16px;
`;
