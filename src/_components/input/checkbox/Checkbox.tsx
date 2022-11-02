import React, { FC } from 'react';

import { TouchableRipple } from '../../button/TouchableRipple';
import { Icon } from '../../icon/Icon';
import { Text } from '../../text/Text';

import { styles } from './Checkbox.styles';

type TCheckboxProps = {
  isChecked: boolean;
  label?: string;
  name?: string;
  onChange: (value: boolean, name?: string) => void;
  type?: 'checkbox' | 'radio';
};

export const Checkbox: FC<TCheckboxProps> = ({ onChange, isChecked, label, name, type = 'checkbox' }) => {
  return (
    <TouchableRipple borderless onPress={() => onChange(!isChecked, name)} style={styles.checkbox}>
      <>
        <Icon
          color="primary"
          name={
            type === 'checkbox'
              ? isChecked
                ? 'CheckboxChecked'
                : 'CheckboxUnchecked'
              : isChecked
              ? 'RadioChecked'
              : 'RadioUnchecked'
          }
          style={styles.icon}
        />
        <Text>{label}</Text>
      </>
    </TouchableRipple>
  );
};

export const RadioButton: FC<Omit<TCheckboxProps, 'type'>> = props => {
  return <Checkbox type="radio" {...props} />;
};
