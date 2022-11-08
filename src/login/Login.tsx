import React from 'react';
import { useTranslation } from 'react-i18next';
import { useAuth0 } from 'react-native-auth0';

import { BrandLogo, DiagonalSplitView } from '../_components';
import * as Styled from './style';

const Login = () => {
  const { t } = useTranslation();
  const { authorize } = useAuth0();

  const handleLogin = async () => {
    try {
      await authorize({ scope: 'openid profile email' });
    } catch (e) {
      // @TODO: general error handling?
      console.error(e);
    }
  };

  return (
    <DiagonalSplitView
      bottomContent={
        <Styled.BottomContainer>
          <Styled.ListItem href="https://google.com/" label={t('HOME.REGISTER')} variant="link" />
          <Styled.ListItem href="https://google.com/" label={t('HOME.WHERE_TO_BUY')} variant="link" />
          <Styled.ListItem label={t('HOME.LOGIN')} onPress={handleLogin} />
        </Styled.BottomContainer>
      }
      topContent={
        <>
          <BrandLogo height={48} inverse />
          <Styled.IntroText align="center" color="white" fontStyle="semibold">
            {t('HOME.INTRO')}
          </Styled.IntroText>
        </>
      }
    />
  );
};

export default Login;
