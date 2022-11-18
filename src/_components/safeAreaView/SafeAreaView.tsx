import { FC } from 'react';
import { ScrollView } from 'react-native';
import { NativeSafeAreaViewProps as RNSafeAreaViewProps } from 'react-native-safe-area-context';

import * as Styled from './style';

type TSafeAreaViewProps = { isScrollable?: boolean } & RNSafeAreaViewProps;

const SafeAreaView: FC<TSafeAreaViewProps> = ({ children, isScrollable = true, ...props }) => {
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
