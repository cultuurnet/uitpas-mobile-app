import LinearGradient from 'react-native-linear-gradient';
import styled from 'styled-components/native';

import { theme } from '../../_styles/theme';
import TouchableRipple from '../touchableRipple/TouchableRipple';

export const REWARD_TILE_WIDTH = 200;

export const InAppRewardContainer = styled.View`
  flex-direction: row;
  align-items: center;
  margin-left: 4px;
`;

export const OnlineIconContainer = styled.View`
  border-radius: ${theme.common.defaultSpacing}px;
  padding: 5px;
  align-items: center;
  justify-content: center;
  background-color: ${theme.palette.primary[600]};
  margin-right: 4px;
`;

export const textContainer = styled.View<{ isTile?: boolean }>`
  min-height: ${({ isTile }) => (isTile ? '102px' : '0')};
  padding: ${({ isTile }) => (isTile ? '8px' : '0')};
  ${({ isTile }) => (isTile ? '' : 'flex: 1')};
`;

export const RewardContainer = styled(TouchableRipple)<{ isTile?: boolean }>`
  align-items: ${({ isTile }) => (isTile ? 'flex-start' : 'center')};
  align-self: stretch;
  background-color: ${theme.palette.neutral[0]};
  border-radius: ${({ isTile }) => (isTile ? '8px' : '0')};
  flex-direction: ${({ isTile }) => (isTile ? 'column' : 'row')};
  padding: ${({ isTile }) => (isTile ? '0' : `${theme.common.defaultSpacing}px`)};
  width: ${({ isTile }) => (isTile ? `${REWARD_TILE_WIDTH}px` : '100%')};
  elevation: ${({ isTile }) => (isTile ? '1' : '0')};
  shadow-color: ${theme.palette.primary[800]};
  shadow-offset: 0px 2px;
  shadow-opacity: ${({ isTile }) => (isTile ? '0.05' : '0')};
  shadow-radius: 2px;
  margin-bottom: ${({ isTile }) => (isTile ? '4px' : '0')};
`;

export const PointsAndLabelContainer = styled.View<{ isTile?: boolean }>`
  flex-direction: row;
  margin-top: ${({ isTile }) => (isTile ? '0' : '8px')};
`;

export const ImageContainer = styled.View<{ isTile?: boolean }>`
  border-top-left-radius: ${({ isTile }) => (isTile ? '8px' : '0')};
  border-top-right-radius: ${({ isTile }) => (isTile ? '8px' : '0')};
  overflow: hidden;
  margin-right: ${({ isTile }) => (isTile ? '0' : `${theme.common.defaultSpacing}px`)};
  position: relative;
`;

export const Image = styled.Image<{ isTile?: boolean }>`
  height: ${({ isTile }) => (isTile ? '120px' : '80px')};
  width: ${({ isTile }) => (isTile ? '200px' : '80px')};
  resize-mode: cover;
  border-radius: ${({ isTile }) => (isTile ? '0' : '8px')};
`;

export const Gradient = styled(LinearGradient)`
  bottom: 0;
  justify-content: flex-end;
  left: 0;
  padding: 8px;
  position: absolute;
  right: 0;
  top: 0;
`;
