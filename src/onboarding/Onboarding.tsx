import { t } from 'i18next';

import { SafeAreaView, Typography } from '../_components';
import { useStackNavigation, useToggle } from '../_hooks';
import { StorageKey } from '../_models';
import { storage } from '../storage';
import * as Styled from './style';

const Onboarding = () => {
  const [isChecked, toggleChecked] = useToggle(false);
  const navigation = useStackNavigation();

  const onPress = () => {
    storage.set(StorageKey.IsPolicyApproved, true);
    navigation.navigate('Home');
  };

  return (
    <SafeAreaView>
      <Styled.TopContainer>
        <Styled.TitleText color="secondaryDark" fontStyle="bold" size="large">
          {t('ONBOARDING.TITLE')}
        </Styled.TitleText>
        <Styled.IntroText align="center" color="text">
          {t('ONBOARDING.INTRO')}
        </Styled.IntroText>
        <Styled.ConfirmCheckbox
          iconSize={23}
          isChecked={isChecked}
          label={
            <Styled.ConfirmViewContainer>
              <Typography color="text">{t('ONBOARDING.LOOK_AT')}</Typography>
              <Styled.LinkButton
                href={t('ONBOARDING.TERMS_OF_SERVICE_URL')}
                label={t('ONBOARDING.TERMS_OF_SERVICE')}
                variant="link"
              />
              <Typography color="text">{t('ONBOARDING.AND')}</Typography>
              <Styled.LinkButton
                href={t('ONBOARDING.PRIVACY_POLICY_URL')}
                label={t('ONBOARDING.PRIVACY_POLICY')}
                variant="link"
              />
            </Styled.ConfirmViewContainer>
          }
          onChange={toggleChecked}
        />
      </Styled.TopContainer>
      <Styled.BottomContainer>
        <Styled.ConfirmButton disabled={!isChecked} label={t('ONBOARDING.CONFIRM')} onPress={onPress} />
      </Styled.BottomContainer>
    </SafeAreaView>
  );
};

export default Onboarding;
