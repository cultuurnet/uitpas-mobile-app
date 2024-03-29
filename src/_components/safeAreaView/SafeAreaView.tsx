import { forwardRef } from 'react';
import { ScrollView, ScrollViewProps, StatusBarStyle, StyleProp, ViewStyle } from 'react-native';
import { NativeSafeAreaViewProps as RNSafeAreaViewProps } from 'react-native-safe-area-context';

import { ThemeColor } from '../../_styles/theme';
import FocusAwareStatusBar from '../statusBar/FocusAwareStatusBar';
import * as Styled from './style';

export type TSafeAreaViewProps = {
  backgroundColor?: ThemeColor;
  barStyle?: StatusBarStyle;
  isScrollable?: boolean;
  stickyHeaderIndices?: number[];
  style?: StyleProp<ViewStyle>;
} & RNSafeAreaViewProps &
  Pick<ScrollViewProps, 'keyboardShouldPersistTaps'>;

const SafeAreaView = forwardRef<ScrollView, TSafeAreaViewProps>(
  (
    {
      children,
      backgroundColor = 'neutral.100',
      stickyHeaderIndices,
      isScrollable = true,
      barStyle = 'light-content',
      keyboardShouldPersistTaps,
      ...props
    },
    ref,
  ) => {
    if (isScrollable) {
      return (
        <Styled.SafeAreaViewContainer backgroundColor={backgroundColor} {...props}>
          <FocusAwareStatusBar barStyle={barStyle} />
          <ScrollView
            contentContainerStyle={[{ flexGrow: 1 }, props.style]}
            keyboardShouldPersistTaps={keyboardShouldPersistTaps}
            ref={ref}
            stickyHeaderIndices={stickyHeaderIndices}
          >
            {children}
          </ScrollView>
        </Styled.SafeAreaViewContainer>
      );
    } else {
      return (
        <Styled.SafeAreaViewContainer backgroundColor={backgroundColor} {...props}>
          <FocusAwareStatusBar barStyle={barStyle} />
          {children}
        </Styled.SafeAreaViewContainer>
      );
    }
  },
);

export default SafeAreaView;
