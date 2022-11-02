import React, { FC, useMemo } from 'react';
import { ActivityIndicator, StyleProp, StyleSheet, TextStyle, useColorScheme, View, ViewProps, ViewStyle } from 'react-native';
import color from 'color';

import { colors, constants, TFontWeight } from '../../_styles';
import { Icon, TIconName } from '../icon/Icon';
import { Text } from '../text/Text';
import { TouchableRipple } from './TouchableRipple';

import { styles } from './Button.styles';

type TProps = ViewProps & {
  accessibilityHint?: string;
  accessibilityLabel?: string;
  children: React.ReactNode;
  color?: keyof typeof colors;
  compact?: boolean;
  contentStyle?: StyleProp<ViewStyle>;
  dark?: boolean;
  disabled?: boolean;
  icon?: TIconName;
  labelStyle?: StyleProp<TextStyle>;
  loading?: boolean;
  mode?: 'text' | 'outlined' | 'contained';
  onLongPress?: () => void;
  onPress?: () => void;
  style?: StyleProp<ViewStyle>;
  uppercase?: boolean;
};

export const Button: FC<TProps> = ({
  disabled,
  compact,
  mode = 'text',
  dark,
  loading,
  icon,
  color: buttonColor,
  children,
  uppercase = false,
  accessibilityLabel,
  accessibilityHint,
  onPress,
  onLongPress,
  style,
  contentStyle,
  labelStyle,
  accessible,
  ...rest
}) => {
  const isDark = useColorScheme() === 'dark';

  const backgroundColor = useMemo(() => {
    if (mode === 'contained') {
      if (disabled) {
        return color(isDark ? colors.white : colors.black)
          .alpha(0.12)
          .rgb()
          .string();
      } else if (buttonColor) {
        return colors[buttonColor];
      } else {
        return colors.primary;
      }
    } else {
      return 'transparent';
    }
  }, [mode, disabled, buttonColor]);

  const textWeight = useMemo<TFontWeight>(() => {
    if (mode === 'contained') {
      return 'bold';
    }
    return 'normal';
  }, [mode]);

  const [borderColor, borderWidth] = useMemo(() => {
    if (mode === 'outlined') {
      if (disabled) {
        return [color(colors[buttonColor]).alpha(0.12).rgb().string(), 1];
      }
      return [colors[buttonColor], 1];
    } else {
      return ['transparent', 0];
    }
  }, [mode]);

  const textColor = useMemo(() => {
    if (disabled) {
      return color(isDark ? colors.white : colors.black)
        .alpha(0.32)
        .rgb()
        .string();
    } else if (mode === 'contained') {
      let isDark: boolean;

      if (typeof dark === 'boolean') {
        isDark = dark;
      } else {
        isDark = backgroundColor === 'transparent' ? false : !color(backgroundColor).isLight();
      }

      return isDark ? colors.white : colors.black;
    } else if (buttonColor) {
      return colors[buttonColor];
    } else {
      return colors.primary;
    }
  }, [mode, disabled, backgroundColor, buttonColor]);

  const rippleColor = color(textColor).alpha(0.32).rgb().string();

  const buttonStyle = {
    backgroundColor,
    borderColor,
    borderRadius: constants.borderRadius,
    borderWidth,
  };
  const touchableStyle = {
    borderRadius: style
      ? ((StyleSheet.flatten(style) || {}) as ViewStyle).borderRadius || constants.borderRadius
      : constants.borderRadius,
  };

  const { color: customLabelColor, fontSize: customLabelSize } = StyleSheet.flatten(labelStyle) || {};

  const textStyle = { color: textColor };
  const iconStyle = StyleSheet.flatten(contentStyle)?.flexDirection === 'row-reverse' ? styles.iconReverse : styles.icon;

  return (
    <View {...rest} style={[styles.button, compact && styles.compact, buttonStyle, style]}>
      <TouchableRipple
        accessibilityHint={accessibilityHint}
        accessibilityLabel={accessibilityLabel}
        accessibilityRole="button"
        accessibilityState={{ disabled }}
        accessible={accessible}
        borderless
        delayPressIn={0}
        disabled={disabled}
        onLongPress={onLongPress}
        onPress={onPress}
        rippleColor={rippleColor}
        style={touchableStyle}
      >
        <View style={[styles.content, contentStyle]}>
          {icon && !loading && (
            <View style={iconStyle}>
              <Icon
                name={icon}
                size={customLabelSize ?? 16}
                style={{ tintColor: typeof customLabelColor === 'string' ? customLabelColor : textColor }}
              />
            </View>
          )}
          {loading && (
            <ActivityIndicator
              color={typeof customLabelColor === 'string' ? customLabelColor : textColor}
              size={customLabelSize ?? 16}
              style={iconStyle}
            />
          )}
          <Text
            numberOfLines={1}
            selectable={false}
            style={[styles.label, compact && styles.compactLabel, uppercase && styles.uppercaseLabel, textStyle, labelStyle]}
            weight={textWeight}
          >
            {children}
          </Text>
        </View>
      </TouchableRipple>
    </View>
  );
};
