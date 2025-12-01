import { Image as ExpoImage } from 'expo-image';
import styled from 'styled-components/native';

const IMAGE_SIZE = 128;

export const Container = styled.View`
  min-height: 160px;
  padding: 16px;
  background-color: ${({ theme }) => theme.palette.primary[700]};
`;

export const Image = styled(ExpoImage)<{ parentHeight: number }>`
  position: absolute;
  top: ${({ parentHeight }) => parentHeight / 2 - IMAGE_SIZE / 2}px;
  right: 16px;
  width: ${IMAGE_SIZE}px;
  height: ${IMAGE_SIZE}px;
`;

export const BottomGap = styled.View`
  width: 100%;
  height: 24px;
  border-width: 0;
  border-color: ${({ theme }) => theme.palette.neutral[200]};
  border-bottom-width: 0.5px;
`;
