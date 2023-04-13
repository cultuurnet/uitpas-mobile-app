import { TouchableOpacity } from 'react-native';
import styled from 'styled-components/native';

import { theme } from '../../../_styles/theme';

export const Container = styled(TouchableOpacity)`
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
