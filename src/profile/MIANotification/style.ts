import styled from 'styled-components/native';

import { Icon, Typography } from '../../_components';

export const NotificationContainer = styled.View`
  margin: 0px 20px;
  position: relative;
  background-color: ${({ theme }) => theme.colors.lightBlue};
  padding: 15px;
  border-radius: 10px;
`;

export const MIAText = styled(Typography)`
  margin-left: 30px;
  margin-right: 20px;
`;

export const ExpirationText = styled(Typography)`
  margin-top: 25px;
  align-self: flex-end;
`;

export const CloseButton = styled(Icon)`
  position: absolute;
  top: 20px;
  left: 12.5px;
`;
