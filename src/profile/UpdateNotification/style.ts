import styled from 'styled-components/native';

import { Button } from '../../_components';

export const NotificationContainer = styled.View`
  margin: 20px 0px 0px;
  background-color: ${({ theme }) => theme.palette.neutral['900']};
  padding: 15px;
  border-radius: 10px;
  flex-direction: row;
`;

export const TextView = styled.View`
  flex: 1;
`;

export const UpdateButton = styled(Button)`
  margin-left: 15px;
`;
