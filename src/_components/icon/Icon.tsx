import React from 'react';
import { ViewInstance } from 'react-native';
import { ImageProps } from 'expo-image';

import * as Icons from '../../_assets/icons';
import { ThemeColor } from '../../_styles/theme';
import { getColor } from '../../_utils';
import * as Styled from './style';

export type TIconName = keyof typeof Icons;

export type TIconProps = {
  accessibilityRole?: 'button' | 'link';
  borderless?: boolean;
  color?: ThemeColor;
  disabled?: boolean;
  name: TIconName;
  onPress?: () => void;
  size?: 'small' | 'large' | number;
} & Omit<ImageProps, 'loading' | 'source'>;

const Icon = React.forwardRef<ViewInstance, TIconProps>(
  (
    {
      accessibilityLabel,
      accessibilityRole,
      size,
      name,
      color,
      style = undefined,
      onPress,
      disabled = false,
      borderless = false,
      ...imageProps
    },
    ref,
  ) => {
    const tintColor = color && getColor(color);

    if (onPress) {
      return (
        <Styled.IconButton
          accessibilityLabel={accessibilityLabel}
          accessibilityRole={accessibilityRole ?? 'button'}
          borderless={borderless}
          disabled={disabled}
          hitSlop={24}
          onPress={onPress}
          ref={ref}
          style={style}
        >
          <Styled.Icon
            {...imageProps}
            accessible={false}
            contentFit="contain"
            size={size}
            source={Icons[name]}
            tintColor={tintColor}
          />
        </Styled.IconButton>
      );
    }

    return (
      <Styled.Icon
        {...imageProps}
        accessibilityLabel={accessibilityLabel}
        accessible={!!accessibilityLabel}
        contentFit="contain"
        size={size}
        source={Icons[name]}
        style={style}
        tintColor={tintColor}
      />
    );
  },
);

Icon.displayName = 'Icon';

export default Icon;
