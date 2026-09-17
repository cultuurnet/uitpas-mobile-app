import React, { FC } from 'react';
import { BottomTabBarButtonProps } from '@react-navigation/bottom-tabs';

import * as Styled from './style';

export type TNavigationButtonProps = BottomTabBarButtonProps & {
  focused: boolean;
};

const NavigationButton: FC<TNavigationButtonProps> = ({ android_ripple: _ripple, style: _style, ...props }) => {
  return <Styled.NavigationButton {...props} />;
};

export default NavigationButton;
