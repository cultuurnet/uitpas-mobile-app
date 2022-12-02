import { FC, useEffect } from 'react';
import { Platform, ScrollView, StatusBar } from 'react-native';
import { NativeSafeAreaViewProps as RNSafeAreaViewProps } from 'react-native-safe-area-context';

import { theme } from '../../_styles/theme';
import * as Styled from './style';

type TSafeAreaViewProps = { isScrollable?: boolean } & RNSafeAreaViewProps;

const SafeAreaView: FC<TSafeAreaViewProps> = ({ children, isScrollable = true, ...props }) => {
  useEffect(() => {
    if (Platform.OS === 'android') StatusBar.setBackgroundColor(theme.palette.neutral['100']);
    StatusBar.setBarStyle('dark-content');
  }, []);

  if (isScrollable) {
    return (
      <Styled.SafeAreaViewContainer {...props}>
        <ScrollView>{children}</ScrollView>
      </Styled.SafeAreaViewContainer>
    );
  } else {
    return <Styled.SafeAreaViewContainer {...props}>{children}</Styled.SafeAreaViewContainer>;
  }
};

export default SafeAreaView;
