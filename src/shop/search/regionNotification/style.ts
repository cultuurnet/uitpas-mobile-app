import { Pressable } from 'react-native';
import styled from 'styled-components/native';

import { Typography } from '../../../_components';

export const NotificationContainer = styled.View`
  padding: 24px;
  justify-content: center;
`;

export const Link = styled(Typography)`
  color: ${({ theme }) => theme.palette.primary['800']};
  font-size: 16px;
`;

export const Cta = styled(Pressable)`
  margin-top: 12px;
  border-radius: 0px;
  font-weight: 400;
`;
