import styled from 'styled-components/native';

import { Button, Typography } from '../_components';

export const TitleText = styled(Typography)`
  margin-bottom: 10px;
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
