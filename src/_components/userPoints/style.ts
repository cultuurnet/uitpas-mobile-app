import { Platform, TouchableOpacity } from 'react-native';
import styled from 'styled-components/native';

import { theme } from '../../_styles/theme';
import Typography from '../typography/Typography';

export const UserPointsButton = styled(TouchableOpacity)`
  padding: 2px 4px 2px 8px;
  border-radius: 16px;
  align-items: center;
  justify-content: center;
  flex-direction: row;
  height: 32px;
  border: 2px solid ${theme.palette.neutral[0]};
`;

export const PointsLabel = styled(Typography)`
  margin-right: 4px;
  background-color: red;
  line-height: ${Platform.OS === 'ios' ? '25px' : '18px'};
  
`;

export const AvatarContainer = styled.View`
  width: 20px;
  height: 20px;
  border-radius: 10px;
  background-color: ${theme.palette.neutral[0]};
  align-items: center;
  justify-content: center;
  text-align: center;
`;
