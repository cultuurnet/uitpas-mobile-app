import { FC } from 'react';
import { ScrollView } from 'react-native';
import { NativeSafeAreaViewProps as RNSafeAreaViewProps } from 'react-native-safe-area-context';

import { ThemeColor } from '../../_styles/theme';
import { getColor } from '../../_utils/colorHelper';
import { FocusAwareStatusBar } from '..';
import * as Styled from './style';

export type TSafeAreaViewProps = { backgroundColor?: ThemeColor; isScrollable?: boolean } & RNSafeAreaViewProps;

const SafeAreaView: FC<TSafeAreaViewProps> = ({ children, backgroundColor = 'neutral.100', isScrollable = true, ...props }) => {
  if (isScrollable) {
    return (
      <Styled.SafeAreaViewContainer backgroundColor={backgroundColor} isScrollable={isScrollable} {...props}>
        <FocusAwareStatusBar backgroundColor={getColor(backgroundColor)} barStyle="light-content" />
        <ScrollView contentContainerStyle={{ paddingBottom: 95 }}>{children}</ScrollView>
      </Styled.SafeAreaViewContainer>
    );
  } else {
    return (
      <Styled.SafeAreaViewContainer backgroundColor={backgroundColor} isScrollable={isScrollable} {...props}>
        <FocusAwareStatusBar backgroundColor={getColor(backgroundColor)} barStyle="light-content" />
        {children}
      </Styled.SafeAreaViewContainer>
    );
  }
};

export default SafeAreaView;
