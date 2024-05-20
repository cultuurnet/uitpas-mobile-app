import React, { FC } from 'react';
import { t } from 'i18next';

import { BlurredModal, Typography } from '../_components';
import { useAuthentication } from '../_context';
import { log } from '../_utils';
import * as Styled from './style';

type TLogOutModalProps = {
  isVisible: boolean;
  toggleIsVisible: () => void;
};

const LogoutModal: FC<TLogOutModalProps> = ({ isVisible, toggleIsVisible }) => {
  const { logout } = useAuthentication();

  const handleLogout = async () => {
    try {
      logout();
      toggleIsVisible();
    } catch (e) {
      // @TODO: general error handling?
      log.error(e);
    }
  };
  return (
    <BlurredModal isVisible={isVisible} toggleIsVisible={toggleIsVisible}>
      <Styled.TitleText fontStyle="bold" size="xlarge">
        {t('AUTHENTICATION.LOG_OUT')}
      </Styled.TitleText>
      <Typography bottomSpacing="10px" size="large">
        {t('AUTHENTICATION.CONFIRM_TEXT')}
      </Typography>
      <Styled.ButtonContainer>
        <Styled.ActionButton label={t('AUTHENTICATION.CANCEL')} onPress={toggleIsVisible} underline={false} variant="link" />
        <Styled.ActionButton label={t('AUTHENTICATION.CONFIRM')} onPress={handleLogout} underline={false} variant="link" />
      </Styled.ButtonContainer>
    </BlurredModal>
  );
};

export default LogoutModal;
