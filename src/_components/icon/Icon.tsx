import React from 'react';
import { ImageStyle, StyleProp } from 'react-native';
import { ImageProps } from 'expo-image';

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
    <Styled.IconButton {...imageProps} borderless={borderless} disabled={disabled} hitSlop={24} onPress={onPress} style={style}>
      <BareIcon />
    </Styled.IconButton>
  ) : (
    <BareIcon iconStyle={style} />
  );
};

export default Icon;
