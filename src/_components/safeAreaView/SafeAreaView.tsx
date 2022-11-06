import { FC } from 'react';
import { NativeSafeAreaViewProps as RNSafeAreaViewProps } from 'react-native-safe-area-context';

import * as Styled from './style';

type TSafeAreaViewProps = { scrollView?: boolean } & RNSafeAreaViewProps;

const SafeAreaView: FC<TSafeAreaViewProps> = ({ children, scrollView = true, ...props }) => {
  if (scrollView) {
    return (
      <Styled.SafeAreaViewContainer>
        <Styled.ViewContainer contentContainerStyle={{ flexGrow: 1 }} {...props}>
          {children}
        </Styled.ViewContainer>
      </Styled.SafeAreaViewContainer>
    );
  } else {
    return <Styled.SafeAreaViewContainer {...props}>{children}</Styled.SafeAreaViewContainer>;
  }
};

export default SafeAreaView;
