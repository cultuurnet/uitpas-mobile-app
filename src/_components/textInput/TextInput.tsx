import { ReactElement } from 'react';
import { useTranslation } from 'react-i18next';
import { TextInputProps, View } from 'react-native';

import * as Styled from './style';

type TTextInputProps = TextInputProps & {
  description?: string | ReactElement;
  isError?: boolean;
  label?: string | ReactElement;
};

const TextInput = ({ description, label, style, ...inputProps }: TTextInputProps) => {
  return (
    <View style={style}>
      {label && <TextInputLabel text={label} />}
      <Styled.TextInput {...inputProps} />
      {description && <TextInputDescription text={description} />}
    </View>
  );
};

export default TextInput;

type TTextInputLabelProps = {
  text: string | ReactElement;
};

export const TextInputLabel = ({ text }: TTextInputLabelProps) => {
  const { t } = useTranslation();

  if (typeof text === 'string') {
    return (
      <Styled.Label color="primary.700" fontStyle="semibold">
        {t(text)}
      </Styled.Label>
    );
  }
  return <Styled.LabelContainer>{text}</Styled.LabelContainer>;
};

type TTextInputDescriptionProps = {
  text: string | ReactElement;
};

export const TextInputDescription = ({ text }: TTextInputDescriptionProps) => {
  const { t } = useTranslation();

  if (typeof text === 'string') {
    return <Styled.Description size="small">{t(text)}</Styled.Description>;
  }
  return <Styled.DescriptionContainer>{text}</Styled.DescriptionContainer>;
};
