import styled from 'styled-components/native';

import { Icon, PressableRipple } from '../_components';
import { theme } from '../_styles/theme';

export const SearchContainer = styled.View<{ paddingTop?: number }>`
  background-color: ${theme.palette.secondary[500]};
  padding: ${({ paddingTop = 0 }) =>
    `${theme.common.defaultSpacing / 2 + paddingTop}px ${theme.common.defaultSpacing}px ${theme.common.defaultSpacing / 2}px`};
  position: relative;
`;

export const SearchButton = styled(PressableRipple)`
  border-radius: 16px;
`;

export const SearchInputContainer = styled.View`
  border-radius: 16px;
  background-color: ${theme.palette.neutral[0]};
  padding: 16px 12px 12px 44px;
`;

export const SearchPlaceholderText = styled.Text`
  font-size: 16px;
  color: ${theme.palette.neutral[400]};
  font-family: Poppins-Regular;
`;

export const SearchIcon = styled(Icon)`
  position: absolute;
  bottom: 26px;
  left: 30px;
`;
