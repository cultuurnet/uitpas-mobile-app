import styled from 'styled-components/native';

import { Icon, SafeAreaView, TouchableRipple } from '../_components';
import { theme } from '../_styles/theme';

export const SafeAreaViewContainer = styled(SafeAreaView)`
  padding-bottom: 95px;
`;

export const SearchContainer = styled.View<{ paddingTop?: number }>`
  background-color: ${theme.palette.secondary[500]};
  padding: ${({ paddingTop = 0 }) =>
    `${theme.common.defaultSpacing / 2 + paddingTop}px ${theme.common.defaultSpacing}px ${theme.common.defaultSpacing / 2}px`};
  position: relative;
`;

export const SearchButton = styled(TouchableRipple)`
  border-radius: 16px;
`;

export const SearchInput = styled.TextInput`
  border-radius: 16px;
  font-size: 16px;
  color: ${theme.palette.neutral[600]};
  font-family: Poppins-Regular;
  background-color: ${theme.palette.neutral[0]};
  padding: 16px 12px 12px 44px;
`;

export const SearchIcon = styled(Icon)`
  position: absolute;
  bottom: 26px;
  left: 30px;
`;
