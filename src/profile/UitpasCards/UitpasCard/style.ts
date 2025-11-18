import styled from 'styled-components/native';
import { Image as ExpoImage } from 'expo-image';

const CARD_MARGIN = 20;

export const getCardWidth = (screenWidth: number, scale: number) => {
  return scale * (screenWidth - CARD_MARGIN * 2);
};

export const ContentContainer = styled.View<{ scale: number; screenWidth: number }>`
  justify-content: space-between;
  position: relative;
  width: ${({ screenWidth, scale }) => `${getCardWidth(screenWidth, scale)}px`};
  z-index: 1;
  background-color: ${({ theme }) => theme.palette.primary['700']};
  border-radius: 15px;
`;

export const UserInfoContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin: 10px;
  z-index: 2;
`;

export const UserAvatar = styled(ExpoImage)`
  width: 32px;
  height: 32px;
  margin-right: 8px;
  border-radius: 16px;
  border-width: 2px;
  border-color: ${({ theme }) => theme.palette.neutral['0']};
`;

export const CardsView = styled.View`
  display: flex;
  flex: 1;
  margin-right: 16px;
`;

export const CardContainer = styled.View`
  position: relative;
  margin: 25px 0px;
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
  min-height: 75px;
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

export const Triangle = styled.View<{ scale: number; screenWidth: number }>`
  position: absolute;
  background-color: transparent;
  z-index: 1;
  border-style: solid;
  border-right-width: ${({ screenWidth, scale }) => `${getCardWidth(screenWidth, scale)}px`};
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
