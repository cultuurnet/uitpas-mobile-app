import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Platform, ScrollView, useWindowDimensions } from 'react-native';
import { Config } from '../_config';
import { EventArg } from '@react-navigation/native';

import { Person } from '../_assets/images';
import { Analytics, BrandLogo, DiagonalSplitView, Spinner } from '../_components';
import { ConfigUrl } from '../_config';
import { useAuthentication } from '../_context';
import { useStackNavigation } from '../_hooks';
import { log } from '../_utils';
import * as Styled from './style';

const Login = () => {
  const [isLoading, setIsLoading] = useState(false);

  const { t } = useTranslation();
  const { authorize, isInitialized } = useAuthentication();
  const navigation = useStackNavigation();
  const { height } = useWindowDimensions();

  useEffect(() => {
    const listener = (e: EventArg<'beforeRemove', true>) => {
      e.preventDefault();
      return;
    };
    navigation.addListener('beforeRemove', listener);

    return () => navigation.removeListener('beforeRemove', listener);
  }, [navigation]);

  const handleLogin = async () => {
    try {
      setIsLoading(true);
      await authorize(
        {
          audience: Config.REACT_NATIVE_APP_AUTH0_AUDIENCE,
          product_display_name: 'UiTPAS',
          referrer: 'uitpas',
          scope: 'openid profile email offline_access',
        },
        { ephemeralSession: true },
      );
      setIsLoading(false);
    } catch (e) {
      // @TODO: general error handling?
      log.error(e);
    }
  };

  if (isLoading || !isInitialized) {
    return <Spinner statusBarStyle={Platform.OS === 'ios' ? 'dark-content' : 'light-content'} />;
  }

  return (
    <ScrollView contentContainerStyle={{ flex: 1 }}>
      <Analytics screenName="Login" />
      <DiagonalSplitView
        bottomContent={
          <Styled.BottomContainer>
            <Styled.ListItem centered href={ConfigUrl.register} label={t('LOGIN.REGISTER')} variant="link" />
            <Styled.ListItem label={t('LOGIN.CTA')} onPress={handleLogin} />
          </Styled.BottomContainer>
        }
        diagonalContainerHeight={150}
        topContent={
          <Styled.TopContainer>
            <BrandLogo height={48} inverse />
            <Styled.IntroText align="center" color="neutral.0">
              {t('LOGIN.INTRO')}
            </Styled.IntroText>

            {height > 600 && <Styled.Illustration source={Person} />}
          </Styled.TopContainer>
        }
      />
    </ScrollView>
  );
};

export default Login;
