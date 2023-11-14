import { t } from 'i18next';

import { Counter } from '../_assets/images';
import { Analytics, Button, SafeAreaView, Typography } from '../_components';
import { ConfigUrl } from '../_config';
import { useStackNavigation, useToggle } from '../_hooks';
import { StorageKey } from '../_models';
import { storage } from '../storage';
import * as Styled from './style';

const Onboarding = () => {
  const [isChecked, toggleChecked] = useToggle(false);
  const navigation = useStackNavigation();

  const onPress = () => {
    storage.set(StorageKey.IsPolicyApproved, true);
    navigation.navigate('Login');
  };

  return (
    <>
      <Analytics screenName="Onboarding" />
      <SafeAreaView backgroundColor="neutral.0" barStyle="dark-content">
        <Styled.TopContainer>
          <Styled.TitleText color="secondary.700" fontStyle="bold" size="large">
            {t('ONBOARDING.TITLE')}
          </Styled.TitleText>
          <Styled.Image source={Counter} />
          <Styled.IntroText align="center" color="neutral.900">
            {t('ONBOARDING.INTRO')}
          </Styled.IntroText>
          <Styled.ConfirmCheckbox
            iconSize={23}
            isChecked={isChecked}
            label={
              <Styled.ConfirmViewContainer>
                <Typography color="neutral.900">{t('ONBOARDING.LOOK_AT')}</Typography>
                <Styled.LinkButton href={ConfigUrl.termsOfService} label={t('ONBOARDING.TERMS_OF_SERVICE')} variant="link" />
                <Typography color="neutral.900">{t('ONBOARDING.AND')}</Typography>
                <Styled.LinkButton href={ConfigUrl.privacyPolicy} label={t('ONBOARDING.PRIVACY_POLICY')} variant="link" />
              </Styled.ConfirmViewContainer>
            }
            onChange={toggleChecked}
          />
        </Styled.TopContainer>
        <Styled.BottomContainer>
          <Button disabled={!isChecked} label={t('ONBOARDING.CONFIRM')} onPress={onPress} />
        </Styled.BottomContainer>
      </SafeAreaView>
    </>
  );
};

export default Onboarding;
