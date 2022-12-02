import * as React from 'react';
import {
  BackgroundPropType,
  Platform,
  StyleProp,
  TouchableHighlight,
  TouchableNativeFeedback,
  TouchableWithoutFeedbackProps,
  View,
  ViewStyle,
} from 'react-native';
import color from 'color';

import { theme } from '../../_styles/theme';

const ANDROID_VERSION_LOLLIPOP = 21;
const ANDROID_VERSION_PIE = 28;

type TProps = TouchableWithoutFeedbackProps & {
  background?: BackgroundPropType;
  borderless?: boolean;
  children: React.ReactNode;
  disabled?: boolean;
  hitSlop?: number;
  onPress?: () => void;
  rippleColor?: string;
  style?: StyleProp<ViewStyle>;
  underlayColor?: string;
};

const TouchableRipple = ({
  style,
  background,
  borderless = false,
  disabled: disabledProp,
  rippleColor,
  underlayColor,
  children,
  hitSlop,
  ...rest
}: TProps) => {
  const disabled = disabledProp || !rest.onPress;
  const calculatedRippleColor = rippleColor || color(theme.palette.neutral['900']).alpha(0.2).rgb().string();

  // A workaround for ripple on Android P is to use useForeground + overflow: 'hidden'
  // https://github.com/facebook/react-native/issues/6480
  const useForeground = Platform.OS === 'android' && Platform.Version >= ANDROID_VERSION_PIE && borderless;

  if (TouchableRipple.supported) {
    return (
      <TouchableNativeFeedback
        {...rest}
        background={background ?? TouchableNativeFeedback.Ripple(calculatedRippleColor, borderless)}
        disabled={disabled}
        hitSlop={hitSlop}
        useForeground={useForeground}
      >
        <View style={style}>{React.Children.only(children)}</View>
      </TouchableNativeFeedback>
    );
  }

  return (
    <TouchableHighlight
      disabled={disabled}
      hitSlop={hitSlop}
      style={style}
      underlayColor={underlayColor ?? color(calculatedRippleColor).fade(0.5).rgb().string()}
      {...rest}
    >
      {React.Children.only(children)}
    </TouchableHighlight>
  );
};

TouchableRipple.supported = Platform.OS === 'android' && Platform.Version >= ANDROID_VERSION_LOLLIPOP;

export default TouchableRipple;
