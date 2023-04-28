import styled from 'styled-components/native';

import { SafeAreaView } from '../../_components';

const CARD_MARGIN = 20;

export const ContentContainer = styled.View<{ screenWidth: number }>`
  justify-content: space-between;
  position: relative;
  width: ${({ screenWidth }) => `${screenWidth - CARD_MARGIN * 2}px`};
  z-index: 1;
  background-color: ${({ theme }) => theme.palette.primary['700']};
  border-radius: 15px;
`;

export const UserInfoContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  margin: 15px;
`;

export const CardContainer = styled.View`
  position: relative;
  margin: 25px 0px;
`;

export const SafeAreaViewContainer = styled(SafeAreaView)`
  background-color: ${({ theme }) => theme.palette.neutral['100']};
`;

export const LogoContainer = styled.View`
  margin-left: -40px;
  margin-top: 15px;
  z-index: 2;
`;

export const PointsView = styled.View`
  align-items: center;
`;

export const BarcodeContainer = styled.View<{ isLarge: boolean }>`
  align-items: center;
  padding: ${({ isLarge }) => (isLarge ? '24px 0' : '8px 0')};
  background-color: ${({ theme }) => theme.palette.neutral['0']};
  border-radius: 10px;
  justify-content: center;
  margin: 10px;
  z-index: 2;
`;

const TRIANGLE_TOP_OFFSET = 65;
const TRIANGLE_HEIGHT = 90;

export const Triangle = styled.View<{ screenWidth: number }>`
  position: absolute;
  background-color: transparent;
  z-index: 1;
  border-style: solid;
  border-right-width: ${({ screenWidth }) => `${screenWidth - CARD_MARGIN * 2}px`};
  border-right-color: transparent;
  border-bottom-width: ${TRIANGLE_HEIGHT}px;
  border-bottom-color: ${({ theme }) => theme.palette.primary['800']};
  border-top-width: ${TRIANGLE_TOP_OFFSET}px;
  border-top-color: transparent;
`;

export const BottomCardView = styled.View`
  position: absolute;
  top: ${TRIANGLE_HEIGHT + TRIANGLE_TOP_OFFSET}px;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: ${({ theme }) => theme.palette.primary['800']};
  border-bottom-left-radius: 15px;
  border-bottom-right-radius: 15px;
`;
