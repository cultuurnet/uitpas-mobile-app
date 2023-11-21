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

export const DeleteMemberButton = styled(Button)`
  margin-left: 8px;
`;

export const DeleteModalButton = styled(Button)`
  margin-top: 32px;
`;

export const CloseModalButton = styled(Button)`
  margin-top: 16px;
`;
