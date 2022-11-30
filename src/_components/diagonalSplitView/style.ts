import styled from 'styled-components/native';

import { Theme } from '../../_styles/theme';
import SafeAreaView from '../safeAreaView/SafeAreaView';

const DIAGONAL_CONTAINER_HEIGHT = 100;

export const TopSafeAreaViewContainer = styled(SafeAreaView)<{ backgroundColor: keyof Theme['colors'] }>`
  background-color: ${({ theme, backgroundColor }) => theme.colors[backgroundColor]};
  flex: 0;
`;

export const ViewContainer = styled(SafeAreaView)`
  background-color: ${({ theme }) => theme.colors.white};
`;

export const TopContainer = styled.View<{ backgroundColor: keyof Theme['colors'] }>`
  background-color: ${({ theme, backgroundColor }) => theme.colors[backgroundColor]};
  align-items: center;
`;

export const BottomContainer = styled.View`
  padding: 20px 16px;
  flex-grow: 1;
`;

export const BottomContainerContent = styled.View`
  padding-bottom: 36px;
`;

export const DiagonalContainer = styled.View<{ lineColor: keyof Theme['colors'] }>`
  position: relative;
  height: ${DIAGONAL_CONTAINER_HEIGHT}px;
  background-color: ${({ theme, lineColor }) => theme.colors[lineColor]};
`;

export const Triangle = styled.View<{ backgroundColor: keyof Theme['colors']; screenWidth: number }>`
  position: absolute;
  background-color: transparent;
  border-style: solid;
  border-right-width: ${({ screenWidth }) => `${screenWidth}px`};
  border-right-color: transparent;
  border-top-width: ${DIAGONAL_CONTAINER_HEIGHT}px;
  border-top-color: ${({ theme, backgroundColor }) => theme.colors[backgroundColor]};
`;

export const TriangleDark = styled.View<{ screenWidth: number }>`
  position: absolute;
  height: ${DIAGONAL_CONTAINER_HEIGHT}px;
  background-color: transparent;
  border-style: solid;
  border-left-width: ${({ screenWidth }) => `${screenWidth}px`};
  border-left-color: transparent;
  border-bottom-width: ${DIAGONAL_CONTAINER_HEIGHT - 20}px;
  border-bottom-color: ${({ theme }) => theme.colors.white};
`;
