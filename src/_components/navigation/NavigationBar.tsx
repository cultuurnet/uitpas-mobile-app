import { FC } from 'react';
import { StyleSheet } from 'react-native';
import { Circle, Defs, Mask, Rect, Svg } from 'react-native-svg';

import { theme } from '../../_styles/theme';

const NavigationBar: FC = () => {
  return (
    <Svg style={StyleSheet.absoluteFill}>
      <Defs>
        <Mask id="cutout">
          <Rect fill="#fff" height="100%" width="100%" x={0} y={0} />
          <Circle cx="50%" cy="0" fill="#000" r="40" />
        </Mask>
      </Defs>
      <Rect fill={theme.palette.neutral['0']} height="100%" mask="url(#cutout)" width="100%" x={0} y={0} />
    </Svg>
  );
};

export default NavigationBar;
