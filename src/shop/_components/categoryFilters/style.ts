import LinearGradient from 'react-native-linear-gradient';
import Styled from 'styled-components/native';

import { PillButton } from '../../../_components';

export const Container = Styled.View`
  margin-vertical: 22px;
  position: relative;
`;

export const Button = Styled(PillButton)`
  margin-right: 8px;
`;

export const Gradient = Styled(LinearGradient)`
  position: absolute;
  right: 0;
  width: 80px;
  top: 0;
  bottom: 0;
`;
