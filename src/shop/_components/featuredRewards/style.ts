import styled from 'styled-components/native';

import { Reward, Typography } from '../../../_components';
import { theme } from '../../../_styles/theme';

export const Container = styled.View`
  margin-bottom: ${theme.common.defaultSpacing}px;
`;

export const Header = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
  padding-left: 16px;
  padding-right: 16px;
`;

export const SectionTile = styled(Typography)`
  flex: 1;
`;

export const ShowMoreButton = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
`;

export const SingleRewardContainer = styled.View`
  padding-left: ${theme.common.defaultSpacing}px;
  padding-right: ${theme.common.defaultSpacing}px;
  margin-bottom: 24px;
`;

export const RewardTileMargin = 16;
export const RewardTile = styled(Reward)<{ isLast?: boolean }>`
  margin-right: ${({ isLast }) => (isLast ? '0' : `${RewardTileMargin}px`)};
`;

export const ContentContainerStyle = {
  paddingLeft: RewardTileMargin,
  paddingRight: 4 * RewardTileMargin,
};
