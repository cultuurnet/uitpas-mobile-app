import { FC } from 'react';

import * as Icons from '../../_assets/icons';
import Icon, { TIconName } from '../icon/Icon';

type TProps = {
  focused?: boolean;
  name: TIconName;
};

const isIconName = (name: string): name is TIconName => Object.keys(Icons).includes(name);

const TabBarIcon: FC<TProps> = ({ focused, name }) => {
  const filledIconName = `${name}Filled`;
  return (
    <Icon
      color={focused ? 'secondary.500' : 'neutral.500'}
      name={focused && isIconName(filledIconName) ? filledIconName : name}
    />
  );
};

export default TabBarIcon;
