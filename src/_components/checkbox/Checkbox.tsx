import { FC } from 'react';
import { Theme } from '../../_styles/theme';

import Icon from '../icon/Icon';

import * as Styled from './style';

type TProps = {
  isChecked: boolean;
  label?: React.ReactNode;
  onChange?: (value: boolean, name?: string) => void;
  name?: string;
  checkedColor?: keyof Theme['colors'];
  iconSize?: number | 'small' | 'large';
};

const Checkbox: FC<TProps> = ({ isChecked, onChange, name, label, checkedColor = 'button', iconSize, ...props }) => {
  return (
    <Styled.ButtonElement
      onPress={() => onChange(!isChecked, name)}
      accessibilityRole="checkbox"
      accessibilityState={{ checked: isChecked }}
      accessible
      {...props}
    >
      <Icon size={iconSize} color={checkedColor} name={isChecked ? 'CheckboxChecked' : 'CheckboxUnchecked'} />
      {label}
    </Styled.ButtonElement>
  );
};

export default Checkbox;
