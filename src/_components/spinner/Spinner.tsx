import { FC, useEffect } from 'react';
import Animated, {
  cancelAnimation,
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
} from 'react-native-reanimated';
import Svg, { Path } from 'react-native-svg';

import { ThemeColor } from '../../_styles/theme';
import { getColor } from '../../_utils/colorHelper';
import * as Styled from './style';

type TProps = {
  color?: ThemeColor;
  fullScreen?: boolean;
  size?: number;
};

const Spinner: FC<TProps> = ({ color = 'secondary.500', size = 44, fullScreen = true }) => {
  const rotation = useSharedValue(0);

  useEffect(() => {
    rotation.value = withRepeat(
      withTiming(360, {
        duration: 1000,
        easing: Easing.linear,
      }),
      -1,
    );
    return () => cancelAnimation(rotation);
  }, [rotation]);

  const animatedStyles = useAnimatedStyle(() => {
    return {
      transform: [
        {
          rotateZ: `${rotation.value}deg`,
        },
      ],
    };
  }, [rotation.value]);

  const Spinner = <Animated.View style={[animatedStyles]}>
    <Svg fill="none" height={size} viewBox="0 0 44 44" width={size}>
      <Path
        d="M22 2C25.9556 2 29.8224 3.17298 33.1114 5.37061C36.4004 7.56824 38.9638 10.6918 40.4776 14.3463C41.9913 18.0009 42.3874 22.0222 41.6157 25.9018C40.844 29.7814 38.9392 33.3451 36.1421 36.1422C33.3451 38.9392 29.7814 40.844 25.9018 41.6157C22.0222 42.3874 18.0008 41.9913 14.3463 40.4776C10.6918 38.9638 7.56821 36.4004 5.37059 33.1114C3.17297 29.8224 1.99999 25.9556 2 22"
        stroke={getColor(color)}
        strokeLinecap="round"
        strokeWidth={4}
      />
    </Svg>
  </Animated.View>;

  if (!fullScreen) return Spinner;

  return (
    <Styled.Wrapper isScrollable={false}>
      {Spinner}
    </Styled.Wrapper>
  );
};

export default Spinner;
