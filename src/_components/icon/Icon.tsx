import React from 'react';
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

const Icon = ({ size, name, color, style = undefined, onPress, disabled = false, borderless = false, ...imageProps }: TIconProps) => {
  const tintColor = color && getColor(color);

  const iconElement = (
    <Styled.Icon
      {...imageProps}
      contentFit="contain"
      size={size}
      source={Icons[name]}
      style={onPress ? undefined : style}
      tintColor={tintColor}
    />
  );

  if (onPress) {
    return (
      <Styled.IconButton {...imageProps} borderless={borderless} disabled={disabled} hitSlop={24} onPress={onPress} style={style}>
        {iconElement}
      </Styled.IconButton>
    );
  }

  return iconElement;
};

export default Icon;
