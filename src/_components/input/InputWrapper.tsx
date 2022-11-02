import React, { FC, ReactNode } from 'react';
import { StyleProp, View, ViewStyle } from 'react-native';

import { TIconName } from '../../_components';
import { TValidatorResponse } from '../../_utils/formValidation';
import { ErrorMessage } from '../errorMessage/ErrorMessage';
import { Icon } from '../icon/Icon';
import { Text } from '../text/Text';

import { styles } from './InputWrapper.styles';

/**
 * This component serves as a wrapper around the specific input components. It contains some common input logic:
 *  - Show input label and icon
 *  - Show error message if needed
 *  - Show whether a field is required
 */

export type TInputWrapperProps = {
  disabled?: boolean;
  label?: string;
  labelIcon?: TIconName;
  required?: boolean;
  style?: StyleProp<ViewStyle>;
  validation?: TValidatorResponse;
};

export const InputWrapper: FC<TInputWrapperProps & { children: ReactNode; showError?: boolean }> = ({
  children,
  style,
  disabled,
  validation,
  label,
  labelIcon,
  required,
  showError,
}) => (
  <View style={[styles.container, disabled && styles.disabled, style]}>
    {!!label && (
      <View style={styles.labelContainer}>
        {!!labelIcon && <Icon color="greyDark" name={labelIcon} size={12} style={styles.icon} />}
        <Text color="greyDark" size="small" weight="bold">
          {label}
        </Text>
        {required && (
          <Text color="errorText" size="small" weight="bold">
            *
          </Text>
        )}
      </View>
    )}
    {children}
    <ErrorMessage isVisible={showError}>{validation?.message}</ErrorMessage>
  </View>
);
