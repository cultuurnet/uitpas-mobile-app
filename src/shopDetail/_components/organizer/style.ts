import { TouchableOpacity } from 'react-native';
import styled from 'styled-components/native';

import { theme } from '../../../_styles/theme';

export const Container = styled(TouchableOpacity)<{ showTopBorder }>`
  border-top-width: ${({ showTopBorder }) => (showTopBorder ? '1px' : '0')};
  border-color: ${theme.palette.neutral['100']};
  padding-top: ${({ showTopBorder }) => (showTopBorder ? '12px' : '0')};
  margin-top: ${({ showTopBorder }) => (showTopBorder ? '6px' : '0')};
  flex-direction: row;
`;

export const ImageContainer = styled.View`
  width: 40px;
  height: 40px;
  background-color: ${theme.palette.secondary['100']};
  border-radius: 20px;
  align-items: center;
  justify-content: center;
  margin-right: 12px;
`;

export const Content = styled.View`
  flex: 1;
`;
