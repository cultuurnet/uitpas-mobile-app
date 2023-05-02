import { FC } from 'react';
import { Platform, StyleSheet } from 'react-native';
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
        <Mask id="cutout-border">
          <Rect fill="#fff" height="100%" width="100%" x={0} y={0} />
          <Circle cx="50%" cy="0" fill="#000" r="39" />
        </Mask>{/* A mask 1 px smaller than the real mask, so we create a border */}
      </Defs>
      {Platform.OS === 'android' && <Rect fill={theme.palette.neutral['100']} height="100%" mask="url(#cutout-border)" width="100%" x={0} y={0} />}{/* Only on Android, this will represent the border of the navigationbar */}
      <Rect fill={theme.palette.neutral['0']} height="100%" mask="url(#cutout)" width="100%" x={0} y={Platform.OS === 'android' ? 1 : 0} />{/* offset of 1, so it looks like the other bar is the border */}
    </Svg>
  );
};

export default NavigationBar;
