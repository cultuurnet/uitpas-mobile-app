import * as React from 'react';
import {
  BackgroundPropType,
  Platform,
  StyleProp,
  TouchableHighlight,
  TouchableNativeFeedback,
  TouchableWithoutFeedbackProps,
  ViewStyle,
} from 'react-native';
import color from 'color';

import { theme } from '../../_styles/theme';
import * as Styled from './style';

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

const TouchableRipple = ({
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
  const calculatedRippleColor = rippleColor || color(theme.colors.text).alpha(0.2).rgb().string();

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
        <Styled.Content borderless={borderless} style={style}>
          {React.Children.only(children)}
        </Styled.Content>
      </TouchableNativeFeedback>
    );
  }

  return (
    <Styled.Content
      as={TouchableHighlight}
      borderless={borderless}
      disabled={disabled}
      style={style}
      underlayColor={underlayColor ?? color(calculatedRippleColor).fade(0.5).rgb().string()}
      {...rest}
    >
      {React.Children.only(children)}
    </Styled.Content>
  );
};

TouchableRipple.supported = Platform.OS === 'android' && Platform.Version >= ANDROID_VERSION_LOLLIPOP;

export default TouchableRipple;
