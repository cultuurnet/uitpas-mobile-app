import { FC } from 'react';
import { ScrollView, StatusBarStyle } from 'react-native';
import { NativeSafeAreaViewProps as RNSafeAreaViewProps } from 'react-native-safe-area-context';

import { ThemeColor } from '../../_styles/theme';
import FocusAwareStatusBar from '../statusBar/FocusAwareStatusBar';
import * as Styled from './style';

export type TSafeAreaViewProps = { backgroundColor?: ThemeColor; barStyle?: StatusBarStyle, isScrollable?: boolean } & RNSafeAreaViewProps;

const SafeAreaView: FC<TSafeAreaViewProps> = ({ children, backgroundColor = 'neutral.100', isScrollable = true, barStyle = 'light-content', ...props }) => {
  if (isScrollable) {
    return (
      <Styled.SafeAreaViewContainer backgroundColor={backgroundColor} isScrollable={isScrollable} {...props}>
        <FocusAwareStatusBar barStyle={barStyle} />
        <ScrollView contentContainerStyle={{ paddingBottom: 95 }}>{children}</ScrollView>
      </Styled.SafeAreaViewContainer>
    );
  } else {
    return (
      <Styled.SafeAreaViewContainer backgroundColor={backgroundColor} isScrollable={isScrollable} {...props}>
        <FocusAwareStatusBar barStyle={barStyle} />
        {children}
      </Styled.SafeAreaViewContainer>
    );
  }
};

export default SafeAreaView;
