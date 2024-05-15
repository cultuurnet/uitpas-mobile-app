import React, { useCallback, useState } from 'react';
import Clipboard from '@react-native-clipboard/clipboard';

import { theme } from '../../_styles/theme';
import Icon from '../icon/Icon';
import Typography from '../typography/Typography';
import * as Styled from './style';

type TProps = {
  label: string;
};

const ClipboardButton = ({ label, ...props }: TProps) => {
  const [isCopied, setIsCopied] = useState(false);

  const onPress = useCallback(() => {
    Clipboard.setString(label);
    setIsCopied(true);
    const timeout = setTimeout(() => {
      setIsCopied(false);
    }, 3000);

    return () => clearTimeout(timeout);
  }, [label]);

  return (
    <Styled.Container {...props} onPress={onPress} underlayColor={theme.palette.primary[200]}>
      <>
        <Typography selectable>{label}</Typography>
        <Icon color="primary.800" name={isCopied ? 'Check' : 'Copy'} size={24} />
      </>
    </Styled.Container>
  );
};

export default ClipboardButton;
