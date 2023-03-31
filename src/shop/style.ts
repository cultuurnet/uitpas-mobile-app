import styled from 'styled-components/native';

import { Reward } from '../_components';
import { theme } from '../_styles/theme';

export const ShopImage = styled.Image`
  align-self: center;
  margin-bottom: 48px;
`;

export const RewardTile = styled(Reward)<{ isLast?: boolean }>`
  margin-right: ${({ isLast }) => (isLast ? '0' : '16px')};
`;

export const RewardList = styled(Reward)<{ isLast?: boolean }>`
  border-bottom: 1px solid ${theme.palette.neutral[300]};
`;
