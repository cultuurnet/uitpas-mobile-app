import React, { useCallback } from 'react';
import { Pressable, PressableProps, ViewStyle, StyleSheet } from 'react-native';
import Animated, { useSharedValue, useAnimatedStyle, withTiming, interpolateColor } from 'react-native-reanimated';

export const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

export type TPressableHighlightProps = Omit<PressableProps, 'style'> & {
  children?: React.ReactNode;
  style?: PressableProps['style'];
  underlayColor?: string;
};

const PressableHighlight = ({
  children,
  style,
  disabled,
  underlayColor = 'rgba(0, 0, 0, 0.1)',
  ...rest
}: TPressableHighlightProps) => {
  const pressed = useSharedValue(0);

  const handlePressIn = useCallback(() => {
    pressed.value = withTiming(1, { duration: 100 });
  }, [pressed]);

  const handlePressOut = useCallback(() => {
    pressed.value = withTiming(0, { duration: 200 });
  }, [pressed]);

  const backgroundColor = React.useMemo(() => {
    if (!style) return 'transparent';
    const flattened = StyleSheet.flatten(style) as ViewStyle;
    return (flattened?.backgroundColor as string) || 'transparent';
  }, [style]);

  const animatedStyle = useAnimatedStyle(() => ({
    backgroundColor: interpolateColor(pressed.value, [0, 1], [backgroundColor, underlayColor]),
    opacity: disabled ? 0.5 : 1,
  }));

  return (
    <AnimatedPressable
      {...rest}
      disabled={disabled}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      style={[style, animatedStyle]}
    >
      {children}
    </AnimatedPressable>
  );
};

PressableHighlight.displayName = 'PressableHighlight';

export default PressableHighlight;
