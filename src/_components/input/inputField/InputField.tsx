import React, { FC, ReactNode } from 'react';
import { StyleProp, TextInput, TextInputProps, ViewStyle } from 'react-native';

import { useInputError } from '../../../_hooks';
import { colors } from '../../../_styles';
import { InputWrapper, TInputWrapperProps } from '../InputWrapper';

import { styles } from './InputField.styles';

export type TInputFieldProps = TInputWrapperProps &
  Omit<TextInputProps, 'onChangeText' | 'onChange'> & {
    icon?: ReactNode;
    name?: string;
    normalize?: (value: string) => string;
    onChange: (text: string, name?: string) => void;
    wrapperStyle?: StyleProp<ViewStyle>;
  };

const InputField: FC<TInputFieldProps> = ({
  icon,
  disabled,
  label,
  labelIcon,
  required,
  style,
  validation,
  onChange,
  normalize,
  name,
  wrapperStyle,
  ...textInputProps
}) => {
  const { setDirty, showError } = useInputError(validation);

  return (
    <InputWrapper
      disabled={disabled}
      label={label}
      labelIcon={labelIcon}
      required={required}
      showError={showError}
      style={wrapperStyle}
      validation={validation}
    >
      <TextInput
        {...textInputProps}
        editable={!disabled}
        onChangeText={value => {
          let normalizedValue = value;
          if (normalize) normalizedValue = normalize(value.trim());
          onChange(normalizedValue, name);
          setDirty();
        }}
        placeholderTextColor={showError ? colors.errorPlaceholder : colors.greyDark}
        selectTextOnFocus={!disabled}
        style={[styles.input, showError && styles.error, style]}
      />
      {icon}
    </InputWrapper>
  );
};
export default InputField;
