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
  position?: 'left' | 'right';
  type?: 'Checkbox' | 'Radio';
  unCheckedColor?: ThemeColor;
};

const Checkbox: FC<TProps> = ({
  isChecked,
  onChange,
  name,
  label,
  checkedColor = 'primary.700',
  iconSize,
  position = 'left',
  type = 'Checkbox',
  unCheckedColor = 'primary.700',
  ...props
}) => {
  return (
    <Styled.ButtonElement
      accessibilityRole="checkbox"
      accessibilityState={{ checked: isChecked }}
      accessible
      onPress={() => onChange(!isChecked, name)}
      {...props}
    >
      {position === 'right' && label}
      <Icon
        color={isChecked ? checkedColor : unCheckedColor}
        name={isChecked ? `${type}Checked` : `${type}Unchecked`}
        size={iconSize}
      />
      {position === 'left' && label}
    </Styled.ButtonElement>
  );
};

export default Checkbox;
