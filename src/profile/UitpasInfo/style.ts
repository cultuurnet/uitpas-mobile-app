import styled from 'styled-components/native';

import { Icon, Typography } from '../../_components';

export const NotificationContainer = styled.View`
  position: relative;
  background-color: ${({ theme }) => theme.colors.lightGreen};
  padding: 15px;
  border-radius: 10px;
`;

export const CardInfo = styled(Typography)`
  margin-right: 20px;
`;

export const CloseButton = styled(Icon)`
  padding: 5px;
  position: absolute;
  top: 7px;
  right: 7px;
`;
