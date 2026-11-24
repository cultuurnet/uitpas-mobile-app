import { ReactElement } from 'react';
import { useTranslation } from 'react-i18next';

import Typography from '../../typography/Typography';
import { TextInputDescription, TextInputLabel } from '../TextInput';
import * as Styled from './style';

type TProps = {
  accessibilityLabel?: string;
  description?: string | ReactElement;
  isError?: boolean;
  label?: string | ReactElement;
  onPress: () => void;
  value: string;
};

const FakeTextInput = ({ accessibilityLabel, description, label, value, ...touchableProps }: TProps) => {
  const { t } = useTranslation();

  const labelText = accessibilityLabel ?? (typeof label === 'string' ? t(label) : undefined);

  // The value is part of the accessible name: Android clears contentDescription when accessibilityValue is null.
  const composedLabel = [labelText, value].filter(Boolean).join(', ');

  return (
    <>
      {label && <TextInputLabel text={label} />}
      <Styled.Touchable accessibilityLabel={composedLabel || undefined} accessibilityRole="button" {...touchableProps}>
        <Typography accessible={false} importantForAccessibility="no">
          {value}
        </Typography>
      </Styled.Touchable>
      {description && <TextInputDescription text={description} />}
    </>
  );
};

export default FakeTextInput;
