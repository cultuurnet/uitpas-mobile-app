import React, { FC } from 'react';
import { useAuth0 } from 'react-native-auth0';
import { t } from 'i18next';

import { BlurredModal, Typography } from '../_components';
import * as Styled from './style';

type TLogOutModalProps = {
  isVisible: boolean;
  toggleIsVisible: () => void;
};

const LogoutModal: FC<TLogOutModalProps> = ({ isVisible, toggleIsVisible }) => {
  const { clearSession } = useAuth0();

  const handleLogout = async () => {
    try {
      toggleIsVisible();
      await clearSession();
    } catch (e) {
      // @TODO: general error handling?
      console.error(e);
    }
  };
  return (
    <BlurredModal isVisible={isVisible} toggleIsVisible={toggleIsVisible}>
      <Styled.TitleText fontStyle="bold" size="large">
        {t('AUTHENTICATION.LOG_OUT')}
      </Styled.TitleText>
      <Typography>{t('AUTHENTICATION.CONFIRM_TEXT')}</Typography>
      <Styled.ButtonContainer>
        <Styled.ActionButton label={t('AUTHENTICATION.CANCEL')} onPress={toggleIsVisible} variant="outline" />
        <Styled.ActionButton label={t('AUTHENTICATION.CONFIRM')} onPress={handleLogout} variant="outline" />
      </Styled.ButtonContainer>
    </BlurredModal>
  );
};

export default LogoutModal;
