import React from 'react';

import { isLiquidGlass } from '../../_utils/iOSHelpers';
import Icon, { TIconName } from '../icon/Icon';
import * as Styled from './style';

export type THeaderIconProps = {
  accessibilityLabel: string;
  name: TIconName;
  onPress: () => void;
};

const HeaderIcon = ({ accessibilityLabel, name, onPress }: THeaderIconProps) => (
  <Styled.Container accessibilityLabel={accessibilityLabel} accessibilityRole="button" hitSlop={8} onPress={onPress}>
    <Icon color={isLiquidGlass ? 'neutral.1200' : 'neutral.0'} name={name} size={20} />
  </Styled.Container>
);

export default HeaderIcon;
