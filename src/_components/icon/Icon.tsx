import React from 'react';
import { ImageProps, ImageStyle, StyleProp, ViewStyle } from 'react-native';

import * as Icons from '../../_assets/icons';
import { Theme } from '../../_styles/theme';
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
  const BareIcon = () => (
    <Styled.Icon {...imageProps} color={color} resizeMode="contain" size={size} source={Icons[name]} style={style} />
  );

  return onPress ? (
    <Styled.IconButton borderless={borderless} disabled={disabled} onPress={onPress} style={buttonStyle}>
      <BareIcon />
    </Styled.IconButton>
  ) : (
    <BareIcon />
  );
};

export default Icon;
