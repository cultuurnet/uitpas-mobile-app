import AsyncStorage from '@react-native-async-storage/async-storage';
import { t } from 'i18next';
import React from 'react';
import { useStackNavigation, useToggle } from '../_hooks';
import { StorageKey } from '../_models';
import * as Styled from './style';

const Onboarding = () => {
  const [isChecked, toggleChecked] = useToggle(false);
  const navigation = useStackNavigation();

  function onPress() {
    AsyncStorage.setItem(StorageKey.IsPolicyApproved, 'true');
    navigation.navigate('Home');
  }

  return (
    <Styled.ViewContainer contentContainerStyle={{ flexGrow: 1 }}>
      <Styled.TopContainer>
        <Styled.TitleText color="secondaryDark" fontStyle="bold" size="large">
          {t('ONBOARDING.TITLE')}
        </Styled.TitleText>
        <Styled.IntroText color="text" align="center">
          {t('ONBOARDING.INTRO')}
        </Styled.IntroText>
        <Styled.ConfirmCheckbox
          iconSize={23}
          label={
            <Styled.ConfirmViewContainer>
              <Styled.LabelText color="text">{t('ONBOARDING.LOOK_AT')}</Styled.LabelText>
              <Styled.LinkButton
                href={t('ONBOARDING.TERMS_OF_SERVICE_URL')}
                label={t('ONBOARDING.TERMS_OF_SERVICE')}
                variant="link"
              />
              <Styled.LabelText color="text">{t('ONBOARDING.AND')}</Styled.LabelText>
              <Styled.LinkButton
                href={t('ONBOARDING.PRIVACY_POLICY_URL')}
                label={t('ONBOARDING.PRIVACY_POLICY')}
                variant="link"
              />
            </Styled.ConfirmViewContainer>
          }
          isChecked={isChecked}
          onChange={toggleChecked}
        ></Styled.ConfirmCheckbox>
      </Styled.TopContainer>
      <Styled.BottomContainer>
        <Styled.ConfirmButton disabled={!isChecked} label={t('ONBOARDING.CONFIRM')} onPress={onPress} />
      </Styled.BottomContainer>
    </Styled.ViewContainer>
  );
};

export default Onboarding;
