import { Image } from 'react-native';
import styled from 'styled-components/native';

import { theme } from '../../_styles/theme';
import Icon from '../icon/Icon';
import Typography from '../typography/Typography';
import { TouchableOpacity } from 'react-native-gesture-handler';

export const UserPointsButton = styled.TouchableOpacity`
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

export const FamilyPointsButton = styled(TouchableOpacity)`
  flex-direction: row;
  align-items: center;
  align-self: flex-start;
  height: 32px;
  padding: 2px;
  border-radius: 18px;
  background-color: ${theme.palette.neutral[0]};
`;

export const AvatarImage = styled(Image)`
  width: 24px;
  height: 24px;
`;

export const MoreCount = styled(Typography)`
  font-size: 12px;
  margin-left: 4px;
`;

export const DropdownIcon = styled(Icon)`
  margin-left: 4px;
  margin-right: 6px;
`;
