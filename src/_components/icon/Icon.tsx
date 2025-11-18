import React from 'react';
import { ImageProps, ImageStyle, StyleProp, ViewStyle } from 'react-native';

import * as Icons from '../../_assets/icons';
import { ThemeColor } from '../../_styles/theme';
import { getColor } from '../../_utils';
import * as Styled from './style';

export type TIconName = keyof typeof Icons;

export type TIconProps = {
  borderless?: boolean;
  color?: ThemeColor;
  disabled?: boolean;
  name: TIconName;
  onPress?: () => void;
  size?: 'small' | 'large' | number;
  style?: StyleProp<ImageStyle | ViewStyle>;
} & Omit<ImageProps, 'source'>;

const Icon = ({ size, name, color, style = {}, onPress, disabled = false, borderless = false, ...imageProps }: TIconProps) => {
  const BareIcon = ({ iconStyle = {} }: { iconStyle?: StyleProp<ImageStyle> }) => (
    <Styled.Icon
      {...imageProps}
      contentFit="contain"
      size={size}
      source={Icons[name]}
      style={iconStyle}
      tintColor={color && getColor(color)}
    />
  );

  return onPress ? (
    <Styled.IconButton hitSlop={24} {...imageProps} borderless={borderless} disabled={disabled} onPress={onPress} style={style}>
      <BareIcon />
    </Styled.IconButton>
  ) : (
    <BareIcon iconStyle={style} />
  );
};

export default Icon;
