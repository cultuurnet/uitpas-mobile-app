import React, { useMemo } from 'react';
import { Image, ImageProps, ImageStyle, StyleProp, ViewStyle } from 'react-native';

import * as Icons from '../../_assets/icons';
import { colors } from '../../_styles';
import { TouchableRipple } from '../button/TouchableRipple';

import { styles } from './Icon.styles';

export type TIconName = keyof typeof Icons;

type TProps = {
  borderless?: boolean;
  buttonStyle?: StyleProp<ViewStyle>;
  color?: keyof typeof colors;
  disabled?: boolean;
  name: TIconName;
  onPress?: () => void;
  size?: 'small' | 'large' | number;
  style?: StyleProp<ImageStyle>;
} & Omit<ImageProps, 'source'>;

export const Icon = ({
  size,
  name,
  color,
  style = {},
  onPress,
  disabled = false,
  borderless = false,
  buttonStyle,
  ...imageProps
}: TProps) => {
  const imageSize = useMemo(() => {
    if (typeof size === 'number') {
      return size;
    }
    if (size === 'small') {
      return 16;
    }
    if (size === 'large') {
      return 40;
    }
    return 20;
  }, [size]);

  const renderIcon = () => {
    const icon = (
      <Image
        {...imageProps}
        resizeMode="contain"
        source={Icons[name]}
        style={[
          color && { tintColor: colors[color] },
          {
            height: imageSize,
            width: imageSize,
          },
          style,
        ]}
      />
    );
    return icon;
  };

  const renderButton = () => (
    <TouchableRipple
      borderless={borderless}
      disabled={disabled}
      onPress={onPress}
      style={[disabled && styles.disabled, borderless && styles.borderless, buttonStyle]}
    >
      {renderIcon()}
    </TouchableRipple>
  );

  return onPress ? renderButton() : renderIcon();
};
