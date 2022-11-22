import Svg from 'react-native-svg';
import styled from 'styled-components/native';

export const CameraWrapper = styled.View`
  position: absolute;
  top: 0px;
  left: 0px;
  width: 100%;
  height: 100%;
`;

export const Overlay = styled(Svg)`
  position: absolute;
  top: 0px;
  left: 0px;
  width: 100%;
  height: 100%;
`;

export const Instruction = styled.View<{ bottom?: number; top?: number }>`
  position: absolute;
  bottom: ${({ bottom }) => (bottom ? `${bottom}px` : 'auto')};
  top: ${({ top }) => (top ? `${top}px` : 'auto')};
  left: 0;
  width: 100%;
  padding: 48px 0;
  align-items: center;
`;
