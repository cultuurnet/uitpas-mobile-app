import React from 'react';
import { Trans as TransI18n, TransProps } from 'react-i18next';

import Typography, { TTypographyProps } from '../typography/Typography';
import * as Styled from './style';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type TProps = TTypographyProps & Omit<TransProps<any>, 'size'> & { buttonOnPress: () => void };

const ButtonTrans = (props: TProps) => {
  return (
    <TransI18n
      components={{
        button: <Styled.UnderlinedLinkText onPress={props.buttonOnPress} size={props.size} />,
      }}
      parent={Typography}
      {...props}
    />
  );
};

export default ButtonTrans;
