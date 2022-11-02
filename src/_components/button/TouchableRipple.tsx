import * as React from 'react';
import {
  BackgroundPropType,
  Platform,
  StyleProp,
  StyleSheet,
  TouchableHighlight,
  TouchableNativeFeedback,
  TouchableWithoutFeedbackProps,
  View,
  ViewStyle,
} from 'react-native';
import color from 'color';

import { colors } from '../../_styles';

const ANDROID_VERSION_LOLLIPOP = 21;
const ANDROID_VERSION_PIE = 28;

type TProps = TouchableWithoutFeedbackProps & {
  background?: BackgroundPropType;
  borderless?: boolean;
  children: React.ReactNode;
  disabled?: boolean;
  onPress?: () => void;
  rippleColor?: string;
  style?: StyleProp<ViewStyle>;
  underlayColor?: string;
};

export const TouchableRipple = ({
  style,
  background,
  borderless = false,
  disabled: disabledProp,
  rippleColor,
  underlayColor,
  children,
  ...rest
}: TProps) => {
  const disabled = disabledProp || !rest.onPress;
  const calculatedRippleColor = rippleColor || color(colors.text).alpha(0.2).rgb().string();

  // A workaround for ripple on Android P is to use useForeground + overflow: 'hidden'
  // https://github.com/facebook/react-native/issues/6480
  const useForeground = Platform.OS === 'android' && Platform.Version >= ANDROID_VERSION_PIE && borderless;

  if (TouchableRipple.supported) {
    return (
      <TouchableNativeFeedback
        {...rest}
        background={background ?? TouchableNativeFeedback.Ripple(calculatedRippleColor, borderless)}
        disabled={disabled}
        useForeground={useForeground}
      >
        <View style={[borderless && styles.overflowHidden, style]}>{React.Children.only(children)}</View>
      </TouchableNativeFeedback>
    );
  }

  return (
    <TouchableHighlight
      {...rest}
      disabled={disabled}
      style={[borderless && styles.overflowHidden, style]}
      underlayColor={underlayColor ?? color(calculatedRippleColor).fade(0.5).rgb().string()}
    >
      {React.Children.only(children)}
    </TouchableHighlight>
  );
};

TouchableRipple.supported = Platform.OS === 'android' && Platform.Version >= ANDROID_VERSION_LOLLIPOP;

const styles = StyleSheet.create({
  overflowHidden: {
    overflow: 'hidden',
  },
});
