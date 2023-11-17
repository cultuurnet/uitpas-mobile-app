import { SafeAreaView as RNSafeAreaView } from 'react-native-safe-area-context';
import styled from 'styled-components/native';

import { Icon, Typography } from '../../../_components';

export const ArrowUp = styled(Icon)`
  position: absolute;
  top: 24px;
  right: 0px;
`;

export const BackgroundImage = styled.Image`
  z-index: -1;
  position: absolute;
  width: 100%;
  height: 100%;
`;

export const SafeAreaView = styled(RNSafeAreaView)`
  flex: 1;
`;

export const ContentContainer = styled.View`
  align-items: center;
  flex: 1;
  justify-content: center;
`;

export const CenteredView = styled.View<{ top: number }>`
  align-items: center;
  align-self: center;
  margin-top: ${({ top }) => `-${top}px`};
  padding: 0 20px;
`;

export const InfoText = styled(Typography)`
  margin-top: 15px;
`;

export const ButtonContainer = styled.View`
  padding: 16px;
`;
