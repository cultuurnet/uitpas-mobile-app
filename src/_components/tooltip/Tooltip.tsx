import React, { useCallback, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ImageStyle, StyleProp, ViewInstance } from 'react-native';

import { focusAccessibilityElement } from '../../_utils';
import BlurredModal from '../blurredModal/BlurredModal';
import Icon from '../icon/Icon';
import Typography from '../typography/Typography';
import * as Styled from './style';

type TProps = {
  style?: StyleProp<ImageStyle>;
};

const Tooltip = ({ style }: TProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const buttonRef = useRef<ViewInstance>(null);
  const hasOpenedRef = useRef(false);

  const { t } = useTranslation();

  const handleToggleIsVisible = () => {
    hasOpenedRef.current = true;
    setIsVisible(currentIsVisible => !currentIsVisible);
  };

  const handleModalDismissed = useCallback(() => {
    if (!hasOpenedRef.current) return;
    hasOpenedRef.current = false;
    focusAccessibilityElement(buttonRef.current);
  }, []);

  return (
    <>
      <Icon
        accessibilityLabel={t('ONBOARDING.FAMILY.ADD_MEMBER.UITPAS_NUMBER_TOOLTIP')}
        name="QuestionFilled"
        onPress={handleToggleIsVisible}
        ref={buttonRef}
        size="small"
        style={style}
      />
      <BlurredModal isVisible={isVisible} onDismiss={handleModalDismissed} toggleIsVisible={handleToggleIsVisible}>
        <Styled.Title fontStyle="bold" size="large">
          {t('ONBOARDING.FAMILY.ADD_MEMBER.UITPAS_NUMBER')}
        </Styled.Title>
        <Typography>{t('ONBOARDING.FAMILY.ADD_MEMBER.UITPAS_NUMBER_INFO')}</Typography>
        <Styled.CloseButton
          fontStyle="semibold"
          label={t('ONBOARDING.FAMILY.ADD_MEMBER.CLOSE')}
          onPress={handleToggleIsVisible}
          underline={false}
          variant="link"
        />
      </BlurredModal>
    </>
  );
};

export default Tooltip;
