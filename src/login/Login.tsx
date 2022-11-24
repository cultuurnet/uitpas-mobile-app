import React from 'react';
import { useTranslation } from 'react-i18next';
import { Config } from 'react-native-config';

import { BrandLogo, DiagonalSplitView } from '../_components';
import { ConfigUrl } from '../_config';
import { useAuthentication } from '../_context';
import * as Styled from './style';

const Login = () => {
  const { t } = useTranslation();
  const { authorize } = useAuthentication();

  const handleLogin = async () => {
    try {
      await authorize(
        { audience: Config.REACT_NATIVE_APP_AUTH0_AUDIENCE, prompt: 'login', scope: 'openid profile email offline_access' },
        { ephemeralSession: true },
      );
    } catch (e) {
      // @TODO: general error handling?
      console.error(e);
    }
  };

  return (
    <DiagonalSplitView
      bottomContent={
        <Styled.BottomContainer>
          <Styled.ListItem centered href={ConfigUrl.register} label={t('LOGIN.REGISTER')} variant="link" />
          <Styled.ListItem centered href={ConfigUrl.loginHelp} label={t('LOGIN.HELP')} variant="link" />
          <Styled.ListItem label={t('LOGIN.CTA')} onPress={handleLogin} />
        </Styled.BottomContainer>
      }
      topContent={
        <>
          <BrandLogo height={48} inverse />
          <Styled.IntroText align="center" color="white" fontStyle="semibold">
            {t('LOGIN.INTRO')}
          </Styled.IntroText>
        </>
      }
    />
  );
};

export default Login;
