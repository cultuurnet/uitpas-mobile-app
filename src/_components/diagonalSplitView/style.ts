import styled from 'styled-components/native';

import { ThemeColor } from '../../_styles/theme';
import { getColor } from '../../_utils';
import SafeAreaView from '../safeAreaView/SafeAreaView';

export const TopSafeAreaViewContainer = styled(SafeAreaView)<{ backgroundColor: ThemeColor }>`
  background-color: ${({ backgroundColor }) => getColor(backgroundColor)};
  flex: 0;
`;

export const ViewContainer = styled(SafeAreaView)`
  background-color: ${({ theme }) => theme.palette.neutral['0']};
`;

export const TopContainer = styled.View<{ backgroundColor: ThemeColor }>`
  background-color: ${({ backgroundColor }) => getColor(backgroundColor)};
  align-items: center;
`;

export const BottomContainer = styled.View`
  padding: 20px 16px;
  flex-grow: 1;
`;

export const BottomContainerContent = styled.View`
  padding-bottom: 36px;
`;

export const DiagonalContainer = styled.View<{ diagonalContainerHeight: number; lineColor: ThemeColor }>`
  position: relative;
  height: ${({ diagonalContainerHeight }) => `${diagonalContainerHeight}px`};
  background-color: ${({ lineColor }) => getColor(lineColor)};
  z-index: -1;
`;

export const Triangle = styled.View<{ backgroundColor: ThemeColor; diagonalContainerHeight: number; screenWidth: number }>`
  position: absolute;
  background-color: transparent;
  border-style: solid;
  border-right-width: ${({ screenWidth }) => `${screenWidth}px`};
  border-right-color: transparent;
  border-top-width: ${({ diagonalContainerHeight }) => `${diagonalContainerHeight}px`};
  border-top-color: ${({ backgroundColor }) => getColor(backgroundColor)};
`;

export const TriangleDark = styled.View<{ diagonalContainerHeight: number; screenWidth: number }>`
  position: absolute;
  height: ${({ diagonalContainerHeight }) => `${diagonalContainerHeight}px`};
  background-color: transparent;
  border-style: solid;
  border-left-width: ${({ screenWidth }) => `${screenWidth}px`};
  border-left-color: transparent;
  border-bottom-width: ${({ diagonalContainerHeight }) => `${diagonalContainerHeight - 20}px`};
  border-bottom-color: ${({ theme }) => theme.palette.neutral['0']};
`;
