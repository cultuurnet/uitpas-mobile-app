import LinearGradient from 'react-native-linear-gradient';
import styled from 'styled-components/native';

import { theme } from '../../_styles/theme';
import TouchableRipple from '../touchableRipple/TouchableRipple';
import Typography from '../typography/Typography';

export const REWARD_TILE_WIDTH = 200;

export const InAppRewardContainer = styled.View`
  flex-direction: row;
  align-items: center;
`;

export const InAppRewardContent = styled.View`
  background-color: ${theme.palette.primary[600]};
  border-top-right-radius: ${theme.common.defaultSpacing}px;
  border-bottom-right-radius: ${theme.common.defaultSpacing}px;
  padding-right: 8px;
  padding-left: 4px;
  height: 20px;
  margin-left: -1px;
`;

export const InAppRewardLabel = styled(Typography)`
  font-size: 12px;
  line-height: 20px;
`;

export const TextContainer = styled.View<{ isTile?: boolean }>`
  min-height: ${({ isTile }) => (isTile ? '102px' : '0')};
  padding: ${({ isTile }) => (isTile ? '8px' : '0')};
  ${({ isTile }) => (isTile ? '' : 'flex: 1;')};
`;

export const RewardListContainer = styled(TouchableRipple)`
  align-items: center;
  align-self: stretch;
  background-color: ${theme.palette.neutral[0]};
  flex-direction: row;
  padding: ${theme.common.defaultSpacing}px;
  width: 100%;
`;
export const RewardTileContainer = styled(TouchableRipple)`
  align-items: flex-start;
  overflow: hidden;
  align-self: stretch;
  background-color: ${theme.palette.neutral[0]};
  border-radius: 8px;
  width: ${REWARD_TILE_WIDTH}px;
  margin-bottom: 4px;
`;

export const PointsAndLabelContainer = styled.View<{ isTile?: boolean }>`
  flex-direction: row;
  margin-top: ${({ isTile }) => (isTile ? '0' : '8px')};
`;

export const ImageContainer = styled.View<{ isTile?: boolean }>`
  border-top-left-radius: ${({ isTile }) => (isTile ? '8px' : '0')};
  border-top-right-radius: ${({ isTile }) => (isTile ? '8px' : '0')};
  height: ${({ isTile }) => (isTile ? '120px' : '80px')};
  width: ${({ isTile }) => (isTile ? '200px' : '80px')};
  overflow: hidden;
  margin-right: ${({ isTile }) => (isTile ? '0' : `${theme.common.defaultSpacing}px`)};
  position: relative;
`;

export const Image = styled.Image<{ hasRadius?: boolean }>`
  height: 100%;
  width: 100%;
  resize-mode: cover;
  border-radius: ${({ hasRadius }) => (hasRadius ? '8px' : '0')};
`;

export const Gradient = styled(LinearGradient)<{ largeSpacing?: boolean }>`
  bottom: 0;
  justify-content: flex-end;
  left: 0;
  padding: ${({ largeSpacing }) => (largeSpacing ? '16px' : '8px')};
  position: absolute;
  right: 0;
  top: 0;
`;
