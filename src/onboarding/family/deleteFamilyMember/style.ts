import styled from 'styled-components/native';

import { Button, PressableRipple, Typography } from '../../../_components';

export const DeleteButton = styled(PressableRipple)`
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 10px 12px;
  border-radius: 16px;
`;

export const DeleteLabel = styled(Typography)`
  margin-left: 8px;
`;

export const UserName = styled(Typography)`
  margin-bottom: 8px;
`;

export const DeleteModalButton = styled(Button)`
  margin-top: 32px;
`;

export const CloseModalButton = styled(Button)`
  margin-top: 16px;
`;
