import { ReactElement } from 'react';
import { Text } from 'react-native';

import { TextInputDescription, TextInputLabel } from '../TextInput';
import * as Styled from './style';

type TProps = {
  description?: string | ReactElement;
  isError?: boolean;
  label?: string | ReactElement;
  onPress: () => void;
  value: string;
};

const FakeTextInput = ({ description, label, value, ...touchableProps }: TProps) => {
  return (
    <>
      {label && <TextInputLabel text={label} />}
      <Styled.Touchable {...touchableProps}>
        <Text>{value}</Text>
      </Styled.Touchable>
      {description && <TextInputDescription text={description} />}
    </>
  );
};

export default FakeTextInput;
