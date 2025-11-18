import React, { useCallback } from 'react';
import { Pressable, PressableProps } from 'react-native';
import Animated, { useSharedValue, useAnimatedStyle, withTiming } from 'react-native-reanimated';

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

export type TPressableOpacityProps = Omit<PressableProps, 'style'> & {
  activeOpacity?: number;
  children?: React.ReactNode;
  style?: PressableProps['style'];
};

const PressableOpacity = ({ activeOpacity = 0.2, children, style, disabled, ...rest }: TPressableOpacityProps) => {
  const opacity = useSharedValue(1);

  const handlePressIn = useCallback(() => {
    opacity.value = withTiming(activeOpacity, { duration: 100 });
  }, [activeOpacity, opacity]);

  const handlePressOut = useCallback(() => {
    opacity.value = withTiming(1, { duration: 200 });
  }, [opacity]);

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: disabled ? 0.5 : opacity.value,
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

export default PressableOpacity;
