import styled from 'styled-components/native';

import { Icon, TouchableRipple, Typography } from '../../_components';
import { theme } from '../../_styles/theme';

export const SearchContainer = styled.View<{ paddingTop?: number }>`
  background-color: ${theme.palette.secondary[500]};
  padding: ${({ paddingTop = 0 }) =>
    `${theme.common.defaultSpacing / 2 + paddingTop}px ${theme.common.defaultSpacing}px ${theme.common.defaultSpacing / 2}px`};
  position: relative;
`;

export const SearchInput = styled.TextInput`
  border-radius: 16px;
  font-size: 16px;
  color: ${theme.palette.neutral[600]};
  font-family: Poppins-Regular;
  background-color: ${theme.palette.neutral[0]};
  padding: 12px 12px 12px 44px;
  line-height: 22px;
  text-align-vertical: center;
`;

export const BackIcon = styled(Icon)`
  position: absolute;
  bottom: 21px;
  left: 27.5px;
`;

export const ResetIcon = styled(Icon)`
  position: absolute;
  bottom: 26px;
  right: 35px;
`;

export const SearchResulstsContainer = styled.View`
  flex: 1;
  background-color: ${theme.palette.neutral[100]};
`;

export const PopularItem = styled(TouchableRipple)`
  padding: 12px;
  padding-left: 16px;
  flex-direction: row;
  align-items: center;
`;

export const RewardSeparator = styled.View`
  border: 1px solid ${theme.palette.neutral[100]};
`;

export const NoContentText = styled(Typography)`
  padding-top: ${theme.common.defaultSpacing}px;
`;

export const PopularItemIcon = styled(Icon)`
  margin-left: 4px;
  margin-right: 10px;
`;

export const Separator = styled.View`
  height: 1px;
  width: 100%;
  margin-left: 16px;
  background-color: ${theme.palette.neutral[200]};
`;
