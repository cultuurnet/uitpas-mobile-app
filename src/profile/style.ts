import styled from 'styled-components/native';

import { Button, Typography } from '../_components';

export const TitleText = styled(Typography)`
  margin-bottom: 10px;
`;

export const BlurContainer = styled.View`
  align-items: center;
  background-color: rgba(0, 0, 0, 0.3);
  flex: 1;
  justify-content: center;
`;

export const ModalContainer = styled.View`
  background-color: ${({ theme }) => {
    return theme.colors.white;
  }};
  height: 150px;
  padding: 20px;
  width: 90%;
  border-radius: 10;
`;

export const ButtonContainer = styled.View`
  flex-direction: row;
  flex-grow: 1;
  justify-content: flex-end;
`;

export const ActionButton = styled(Button)`
  margin-left: 10px;
  margin-top: 20px
  align-content: flex-end;
`;
