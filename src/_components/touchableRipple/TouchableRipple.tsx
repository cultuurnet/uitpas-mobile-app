import * as React from 'react';
import { Pressable, PressableProps, StyleProp, ViewStyle } from 'react-native';
import color from 'color';

import { theme } from '../../_styles/theme';

type TProps = Omit<PressableProps, 'style'> & {
  borderless?: boolean;
  children: React.ReactNode;
  disabled?: boolean;
  hitSlop?: number;
  loading?: boolean;
  onPress?: () => void;
  rippleColor?: string;
  style?: StyleProp<ViewStyle>;
  underlayColor?: string;
};

const TouchableRipple = ({
  style,
  borderless = false,
  disabled: disabledProp,
  rippleColor,
  underlayColor,
  children,
  hitSlop,
  loading,
  ...rest
}: TProps) => {
  const disabled = disabledProp || loading || !rest.onPress;
  const calculatedRippleColor = rippleColor || color(theme.palette.primary['900']).alpha(0.2).rgb().string();

  return (
    <Pressable
      {...rest}
      android_ripple={{
        color: calculatedRippleColor,
        borderless,
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

export default TouchableRipple;
