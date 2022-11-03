import { FC } from 'react';

import Icon from '../icon/Icon';

type TProps = {
  focused?: boolean;
  name: 'Shop' | 'QR' | 'Profile';
};

const TabBarIcon: FC<TProps> = ({ focused, name }) => (
  <Icon color={focused ? 'primary' : 'grey'} name={focused ? `${name}Filled` : name} />
);

export default TabBarIcon;
