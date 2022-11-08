import styled from 'styled-components/native';

import SafeAreaView from '../safeAreaView/SafeAreaView';

const DIAGONAL_CONTAINER_HEIGHT = 100;

export const TopSafeAreViewContainer = styled(SafeAreaView)`
  background-color: ${({ theme }) => theme.colors.secondary};
  flex: 0;
`;

export const ViewContainer = styled(SafeAreaView)`
  background-color: ${({ theme }) => theme.colors.white};
`;

export const TopContainer = styled.View`
  padding: 40px 16px;
  background-color: ${({ theme }) => theme.colors.secondary};
  align-items: center;
`;

export const BottomContainer = styled.View`
  padding: 20px 16px;
  flex-grow: 1;
`;

export const DiagonalContainer = styled.View`
  position: relative;
  height: ${DIAGONAL_CONTAINER_HEIGHT}px;
  background-color: ${({ theme }) => theme.colors.secondaryDark};
`;

export const Triangle = styled.View<{ screenWidth: number }>`
  position: absolute;
  background-color: transparent;
  border-style: solid;
  border-right-width: ${({ screenWidth }) => `${screenWidth}px`};
  border-right-color: transparent;
  border-top-width: ${DIAGONAL_CONTAINER_HEIGHT}px;
  border-top-color: ${({ theme }) => theme.colors.secondary};
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
