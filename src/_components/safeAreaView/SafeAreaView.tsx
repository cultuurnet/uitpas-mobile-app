import { FC } from 'react';
import { ScrollView, StatusBar } from 'react-native';
import { NativeSafeAreaViewProps as RNSafeAreaViewProps } from 'react-native-safe-area-context';

import { ThemeColor } from '../../_styles/theme';
import { getColor } from '../../_utils/colorHelper';
import * as Styled from './style';

export type TSafeAreaViewProps = { backgroundColor?: ThemeColor; isScrollable?: boolean } & RNSafeAreaViewProps;

const SafeAreaView: FC<TSafeAreaViewProps> = ({ children, backgroundColor = 'neutral.100', isScrollable = true, ...props }) => {
  if (isScrollable) {
    return (
      <Styled.SafeAreaViewContainer backgroundColor={backgroundColor} isScrollable={isScrollable} {...props}>
        <StatusBar backgroundColor={getColor(backgroundColor)} barStyle="dark-content" />
        <ScrollView contentContainerStyle={{ paddingBottom: 95 }}>{children}</ScrollView>
      </Styled.SafeAreaViewContainer>
    );
  } else {
    return (
      <Styled.SafeAreaViewContainer backgroundColor={backgroundColor} isScrollable={isScrollable} {...props}>
        <StatusBar backgroundColor={getColor(backgroundColor)} barStyle="dark-content" />
        {children}
      </Styled.SafeAreaViewContainer>
    );
  }
};

export default SafeAreaView;
