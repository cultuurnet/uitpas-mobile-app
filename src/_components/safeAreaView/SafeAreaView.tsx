import { FC, useEffect } from 'react';
import { Platform, ScrollView, StatusBar } from 'react-native';
import { NativeSafeAreaViewProps as RNSafeAreaViewProps } from 'react-native-safe-area-context';

import { ThemeColor } from '../../_styles/theme';
import { getColor } from '../../_utils/colorHelper';
import * as Styled from './style';

export type TSafeAreaViewProps = { backgroundColor?: ThemeColor; isScrollable?: boolean } & RNSafeAreaViewProps;

const SafeAreaView: FC<TSafeAreaViewProps> = ({ children, backgroundColor = 'neutral.100', isScrollable = true, ...props }) => {
  useEffect(() => {
    if (Platform.OS === 'android') StatusBar.setBackgroundColor(getColor(backgroundColor));
    StatusBar.setBarStyle('dark-content');
  }, []);

  if (isScrollable) {
    return (
      <Styled.SafeAreaViewContainer backgroundColor={backgroundColor} isScrollable={isScrollable} {...props}>
        <ScrollView contentContainerStyle={{ paddingBottom: 95 }}>{children}</ScrollView>
      </Styled.SafeAreaViewContainer>
    );
  } else {
    return (
      <Styled.SafeAreaViewContainer backgroundColor={backgroundColor} isScrollable={isScrollable} {...props}>
        {children}
      </Styled.SafeAreaViewContainer>
    );
  }
};

export default SafeAreaView;
