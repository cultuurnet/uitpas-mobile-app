import { FC } from 'react';

import { ThemeColor } from '../../_styles/theme';
import Icon, { TIconProps } from '../icon/Icon';
import * as Styled from './style';

type TProps = {
  checkedColor?: ThemeColor;
  iconSize?: TIconProps['size'];
  isChecked: boolean;
  label?: React.ReactNode;
  name?: string;
  onChange?: (value: boolean, name: string) => void;
};

const Checkbox: FC<TProps> = ({ isChecked, onChange, name, label, checkedColor = 'primary.700', iconSize, ...props }) => {
  return (
    <Styled.ButtonElement
      accessibilityRole="checkbox"
      accessibilityState={{ checked: isChecked }}
      accessible
      onPress={() => onChange(!isChecked, name)}
      {...props}
    >
      <Icon color={checkedColor} name={isChecked ? 'CheckboxChecked' : 'CheckboxUnchecked'} size={iconSize} />
      {label}
    </Styled.ButtonElement>
  );
};

export default Checkbox;
