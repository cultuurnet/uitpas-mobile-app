import styled from 'styled-components/native';

import { TNavigationButtonProps } from './NavigationButton';

export const NavigationButton = styled.Pressable<TNavigationButtonProps>`
  position: absolute;
  top: -45px;
  left: 50%;
  margin-left: -35px;
  width: 70px;
  height: 70px;
  padding: 0;
  border-radius: 35px;
  background-color: ${({ theme, focused }) => (focused ? theme.palette.primary['600'] : theme.palette.neutral['0'])};
  border: ${({ theme, focused }) => (focused ? 'none' : `2px solid ${theme.palette.neutral['200']}`)};
  padding: 15px;
  z-index: 1;
  /* shadow */
  elevation: 6;
  shadow-color: black;
  shadow-offset: 0px 3px;
  shadow-opacity: 0.27;
  shadow-radius: 4.65px;
`;
