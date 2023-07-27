import React from 'react';
import { Trans as TransI18n, TransProps } from 'react-i18next';

import Typography, { TTypographyProps } from '../typography/Typography';
import * as Styled from './style';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type TProps = TTypographyProps & Omit<TransProps<any>, 'size'> & { onButtonPress?: () => void };

const Trans = (props: TProps) => {
  return (
    <TransI18n
      components={{
        bold: <Typography fontStyle="bold" size={props.size} />,
        button: <Styled.UnderlinedLinkText onPress={props.onButtonPress} size={props.size} />,
      }}
      parent={Typography}
      {...props}
    />
  );
};

export default Trans;
