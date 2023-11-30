import { Image } from 'react-native';
import styled from 'styled-components/native';

import { theme } from '../../../_styles/theme';
import Icon from '../../icon/Icon';
import Typography from '../../typography/Typography';

export const Container = styled.TouchableOpacity`
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
