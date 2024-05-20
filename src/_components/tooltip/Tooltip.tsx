import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ImageStyle, StyleProp } from 'react-native';

import BlurredModal from '../blurredModal/BlurredModal';
import Icon from '../icon/Icon';
import Typography from '../typography/Typography';
import * as Styled from './style';

type TProps = {
  style?: StyleProp<ImageStyle>;
};

const Tooltip = ({ style }: TProps) => {
  const [isVisible, setIsVisible] = useState(false);

  const { t } = useTranslation();

  const handleToggleIsVisible = () => {
    setIsVisible(currentIsVisible => !currentIsVisible);
  };

  return (
    <>
      <Icon name="QuestionFilled" onPress={handleToggleIsVisible} size="small" style={style} />
      <BlurredModal isVisible={isVisible} toggleIsVisible={handleToggleIsVisible}>
        <Styled.Title fontStyle="bold" size="large">
          {t('ONBOARDING.FAMILY.ADD_MEMBER.UITPAS_NUMBER')}
        </Styled.Title>
        <Typography>{t('ONBOARDING.FAMILY.ADD_MEMBER.UITPAS_NUMBER_INFO')}</Typography>
        <Styled.CloseButton
          fontStyle="semibold"
          label={t('ONBOARDING.FAMILY.ADD_MEMBER.CLOSE')}
          underline={false}
          variant="link"
        />
      </BlurredModal>
    </>
  );
};

export default Tooltip;
