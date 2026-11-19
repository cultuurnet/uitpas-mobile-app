import React from 'react';
import { Platform } from 'react-native';

import Icon, { TIconName } from '../icon/Icon';
import * as Styled from './style';

export type THeaderIconProps = {
  accessibilityLabel: string;
  name: TIconName;
  onPress: () => void;
};

const isLiquidGlass = Platform.OS === 'ios' && parseInt(String(Platform.Version), 10) >= 26;

const HeaderIcon = ({ accessibilityLabel, name, onPress }: THeaderIconProps) => (
  <Styled.Container accessibilityLabel={accessibilityLabel} accessibilityRole="button" hitSlop={8} onPress={onPress}>
    <Icon color={isLiquidGlass ? 'neutral.1200' : 'neutral.0'} name={name} size={20} />
  </Styled.Container>
);

export default HeaderIcon;
