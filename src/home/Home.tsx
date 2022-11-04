import React from 'react';
import { useTranslation } from 'react-i18next';

import { BrandLogo, DiagonalSplitView } from '../_components';
import { useStackNavigation } from '../_hooks';
import * as Styled from './style';

const Home = () => {
  const { t } = useTranslation();
  const navigation = useStackNavigation();

  return (
    <DiagonalSplitView
      bottomContent={
        <Styled.BottomContainer>
          <Styled.ListItem href="https://google.com/" label={t('HOME.REGISTER')} variant="link" />
          <Styled.ListItem href="https://google.com/" label={t('HOME.WHERE_TO_BUY')} variant="link" />
          <Styled.ListItem
            label={t('HOME.LOGIN')}
            onPress={() => {
              navigation.navigate('MainNavigator');
            }}
          />
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

export default Home;
