import { FC, PropsWithChildren } from 'react';
import { View } from 'react-native';

import * as Styled from './style';

const BulletListItem: FC<PropsWithChildren> = ({ children }) => {
  return (
    <Styled.BulletListItem>
      <Styled.Disk />
      <View>{children}</View>
    </Styled.BulletListItem>
  );
};

export default BulletListItem;
