import styled from 'styled-components/native';

import { SafeAreaView } from '../../_components';

const CARD_MARGIN = 20;

export const ContentContainer = styled.View`
  height: 100%;
  justify-content: space-between;
  position: absolute;
  width: 100%;
  z-index: 1;
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
  background-color: ${({ theme }) => theme.colors.background};
`;

export const LogoContainer = styled.View`
  margin-left: -60px;
  margin-top: 15px;
`;

export const PointsView = styled.View`
  align-items: center;
`;
export const BarcodeContainer = styled.View`
  align-items: center;
  background-color: ${({ theme }) => theme.colors.white};
  border-radius: 10px;
  height: 75px;
  justify-content: center;
  margin: 7.5px 7.5px;
`;

export const TopCardView = styled.View<{ screenWidth: number }>`
  display: flex;
  position: relative;
  height: 155px;
  width: ${({ screenWidth }) => `${screenWidth - CARD_MARGIN * 2}px`};
  background-color: ${({ theme }) => theme.colors.primary};
  border-top-left-radius: 15px;
  border-top-right-radius: 15px;
`;

export const Triangle = styled.View<{ screenWidth: number }>`
  position: absolute;
  background-color: transparent;
  border-style: solid;
  border-right-width: ${({ screenWidth }) => `${screenWidth - CARD_MARGIN * 2}px`};
  border-right-color: transparent;
  border-bottom-width: 90px;
  border-bottom-color: ${({ theme }) => theme.colors.secondary};
  border-top-width: 65px;
  border-top-color: transparent;
`;

export const BottomCardView = styled.View<{ screenWidth: number }>`
  height: 45px;
  width: ${({ screenWidth }) => `${screenWidth - CARD_MARGIN * 2}px`};
  background-color: ${({ theme }) => theme.colors.secondary};
  border-bottom-left-radius: 15px;
  border-bottom-right-radius: 15px;
`;
