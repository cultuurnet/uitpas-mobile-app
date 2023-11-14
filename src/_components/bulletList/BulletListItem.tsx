import { FC } from 'react';
import { StyleProp, View, ViewStyle } from 'react-native';

import * as Styled from './style';

type TProps = {
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
};

const BulletListItem: FC<TProps> = ({ children, style }: TProps) => {
  return (
    <Styled.BulletListItem style={style}>
      <Styled.Disk />
      <View>{children}</View>
    </Styled.BulletListItem>
  );
};

export default BulletListItem;
