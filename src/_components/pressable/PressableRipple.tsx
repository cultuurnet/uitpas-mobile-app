import * as React from 'react';
import { Pressable, PressableProps, StyleProp, ViewStyle } from 'react-native';
import color from 'color';

import { theme } from '../../_styles/theme';

export type TPressableRippleProps = Omit<PressableProps, 'style'> & {
  borderless?: boolean;
  children?: React.ReactNode;
  disabled?: boolean;
  hitSlop?: number;
  loading?: boolean;
  onPress?: () => void;
  rippleColor?: string;
  style?: StyleProp<ViewStyle>;
  underlayColor?: string;
};

const PressableRipple = ({
  style,
  borderless = false,
  disabled: disabledProp,
  rippleColor,
  children,
  hitSlop,
  underlayColor = theme.palette.primary['900'],
  loading,
  ...rest
}: TPressableRippleProps) => {
  const disabled = disabledProp || loading || !rest.onPress;
  const calculatedRippleColor = rippleColor || color(underlayColor).alpha(0.2).rgb().string();

  return (
    <Pressable
      {...rest}
      android_ripple={{
        borderless,
        color: calculatedRippleColor,
        foreground: true,
      }}
      disabled={disabled}
      hitSlop={hitSlop}
      style={style}
    >
      {children}
    </Pressable>
  );
};

export default PressableRipple;
