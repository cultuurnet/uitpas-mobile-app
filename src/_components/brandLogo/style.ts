import { Image as ExpoImage } from 'expo-image';
import styled from 'styled-components/native';

export const LogoImage = styled(ExpoImage)<{ height: number }>`
  height: ${({ height }) => height}px;
  width: ${({ height }) => (201 / 48) * height}px;
`;
