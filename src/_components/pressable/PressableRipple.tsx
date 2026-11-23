import * as React from 'react';
import { Pressable, PressableProps, StyleProp, ViewInstance, ViewStyle } from 'react-native';
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

const PressableRipple = React.forwardRef<ViewInstance, TPressableRippleProps>(
  (
    {
      style,
      borderless = false,
      disabled: disabledProp,
      rippleColor,
      children,
      hitSlop,
      underlayColor = theme.palette.primary['900'],
      loading,
      ...rest
    },
    ref,
  ) => {
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
        ref={ref}
        style={style}
      >
        {children}
      </Pressable>
    );
  },
);

PressableRipple.displayName = 'PressableRipple';

export default PressableRipple;
