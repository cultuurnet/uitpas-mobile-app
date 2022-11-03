import { FC } from 'react';

import * as Icons from '../../_assets/icons';
import Icon, { TIconName } from '../icon/Icon';

type TProps = {
  focused?: boolean;
  name: Extract<TIconName, 'Shop' | 'QR' | 'Profile'>;
};

const isIconName = (name: string): name is TIconName => Object.keys(Icons).includes(name);

const TabBarIcon: FC<TProps> = ({ focused, name }) => {
  const filledIconName = `${name}Filled`;
  return <Icon color={focused ? 'primary' : 'grey'} name={focused && isIconName(filledIconName) ? filledIconName : name} />;
};

export default TabBarIcon;
