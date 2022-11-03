import React from 'react';
import { ImageProps, ImageStyle, StyleProp, ViewStyle } from 'react-native';

import * as Icons from '../../_assets/icons';
import { Theme } from '../../_styles/theme';
import TouchableRipple from '../touchableRipple/TouchableRipple';
import * as Styled from './style';

export type TIconName = keyof typeof Icons;

export type TIconProps = {
  borderless?: boolean;
  buttonStyle?: StyleProp<ViewStyle>;
  color?: keyof Theme['colors'];
  disabled?: boolean;
  name: TIconName;
  onPress?: () => void;
  size?: 'small' | 'large' | number;
  style?: StyleProp<ImageStyle>;
} & Omit<ImageProps, 'source'>;

const Icon = ({
  size,
  name,
  color,
  style = {},
  onPress,
  disabled = false,
  borderless = false,
  buttonStyle,
  ...imageProps
}: TIconProps) => {
  return (
    <Styled.IconButton
      as={onPress ? TouchableRipple : React.Fragment}
      borderless={borderless}
      disabled={disabled}
      onPress={onPress}
      style={buttonStyle}
    >
      <Styled.Icon {...imageProps} color={color} resizeMode="contain" size={size} source={Icons[name]} style={style} />
    </Styled.IconButton>
  );
};

export default Icon;
