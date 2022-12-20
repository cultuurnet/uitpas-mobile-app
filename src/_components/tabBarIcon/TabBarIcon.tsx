import { FC } from 'react';

import * as Icons from '../../_assets/icons';
import { ThemeColor } from '../../_styles/theme';
import Icon, { TIconName } from '../icon/Icon';

type TProps = {
  focused: boolean;
  name: TIconName;
  size?: number;
};

const isIconName = (name: string): name is TIconName => Object.keys(Icons).includes(name);

const TabBarIcon: FC<TProps> = ({ focused, name, size }) => {
  const filledIconName = `${name}Filled`;
  let color: ThemeColor = focused ? 'secondary.500' : 'neutral.500';

  if (name === 'QR') {
    color = focused ? 'neutral.0' : 'primary.500';
  }

  return <Icon color={color} name={focused && isIconName(filledIconName) ? filledIconName : name} size={size} />;
};

export default TabBarIcon;
