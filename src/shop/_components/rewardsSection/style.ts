import styled from 'styled-components/native';

import { Reward, Typography } from '../../../_components';
import { theme } from '../../../_styles/theme';

export const Container = styled.View`
  margin-bottom: 24px;
`;

export const Header = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
  padding-horizontal: 16px;
`;

export const SectionTile = styled(Typography)`
  flex: 1;
`;

export const ShowMoreButton = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
`;

export const RewardTileMargin = 16;
export const RewardTile = styled(Reward)<{ isLast?: boolean }>`
  margin-right: ${({ isLast }) => (isLast ? '0' : `${RewardTileMargin}px`)};
`;

export const Separator = styled.View`
  border-width: 1px;
  border-color: ${theme.palette.neutral[100]};
`;

export const ContentContainerStyle = {
  paddingLeft: RewardTileMargin,
  paddingRight: 4 * RewardTileMargin,
};

export const HorizontalLoaderContainer = styled.View`
  flex-direction: row;
  padding-horizontal: ${RewardTileMargin}px;
`;
export const HorizontalLoaderSeparator = styled.View`
  width: ${RewardTileMargin}px;
`;
