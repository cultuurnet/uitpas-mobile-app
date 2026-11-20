import React, { useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { AccessibilityInfo } from 'react-native';
import * as Clipboard from 'expo-clipboard';

import { theme } from '../../_styles/theme';
import Icon from '../icon/Icon';
import Typography from '../typography/Typography';
import * as Styled from './style';

type TProps = {
  accessibilityLabel?: string;
  label: string;
};

const ClipboardButton = ({ label, accessibilityLabel, ...props }: TProps) => {
  const { t } = useTranslation();
  const [isCopied, setIsCopied] = useState(false);
  const copyLabel = accessibilityLabel ?? `${label}, ${t('GENERAL.COPY')}`;

  const onPress = useCallback(async () => {
    await Clipboard.setStringAsync(label);
    AccessibilityInfo.announceForAccessibility(t('GENERAL.COPIED'));
    setIsCopied(true);
    const timeout = setTimeout(() => {
      setIsCopied(false);
    }, 3000);

    return () => clearTimeout(timeout);
  }, [label, t]);

  return (
    <Styled.Container
      {...props}
      accessibilityLabel={copyLabel}
      accessibilityRole="button"
      onPress={onPress}
      underlayColor={theme.palette.primary[200]}
    >
      <>
        <Typography selectable>{label}</Typography>
        <Icon accessible={false} color="primary.800" name={isCopied ? 'Check' : 'Copy'} size={24} />
      </>
    </Styled.Container>
  );
};

export default ClipboardButton;
