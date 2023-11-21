import { FC } from 'react';
import { StyleProp, ViewStyle } from 'react-native';

import * as Styled from './style';

type TProps = {
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
};

const BulletListItem: FC<TProps> = ({ children, style }: TProps) => {
  return (
    <Styled.BulletListItem style={style}>
      <Styled.Disk />
      <Styled.Description>{children}</Styled.Description>
    </Styled.BulletListItem>
  );
};

export default BulletListItem;
