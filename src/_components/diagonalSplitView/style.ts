import styled from 'styled-components/native';

import { ThemeColor } from '../../_styles/theme';
import { getColor } from '../../_utils/colorHelper';
import SafeAreaView from '../safeAreaView/SafeAreaView';

const DIAGONAL_CONTAINER_HEIGHT = 100;

export const TopSafeAreaViewContainer = styled(SafeAreaView)<{ backgroundColor: ThemeColor }>`
  background-color: ${({ backgroundColor }) => getColor(backgroundColor)};
  flex: 0;
`;

export const ViewContainer = styled(SafeAreaView)`
  background-color: ${({ theme }) => theme.palette.neutral['0']};
`;

export const TopContainer = styled.View<{ backgroundColor: ThemeColor }>`
  padding: 40px 16px;
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

export const DiagonalContainer = styled.View<{ lineColor: ThemeColor }>`
  position: relative;
  height: ${DIAGONAL_CONTAINER_HEIGHT}px;
  background-color: ${({ lineColor }) => getColor(lineColor)};
`;

export const Triangle = styled.View<{ backgroundColor: ThemeColor; screenWidth: number }>`
  position: absolute;
  background-color: transparent;
  border-style: solid;
  border-right-width: ${({ screenWidth }) => `${screenWidth}px`};
  border-right-color: transparent;
  border-top-width: ${DIAGONAL_CONTAINER_HEIGHT}px;
  border-top-color: ${({ backgroundColor }) => getColor(backgroundColor)};
`;

export const TriangleDark = styled.View<{ screenWidth: number }>`
  position: absolute;
  height: ${DIAGONAL_CONTAINER_HEIGHT}px;
  background-color: transparent;
  border-style: solid;
  border-left-width: ${({ screenWidth }) => `${screenWidth}px`};
  border-left-color: transparent;
  border-bottom-width: ${DIAGONAL_CONTAINER_HEIGHT - 20}px;
  border-bottom-color: ${({ theme }) => theme.palette.neutral['0']};
`;
