import { useWindowDimensions } from 'react-native';
import { t } from 'i18next';

import { Counter } from '../_assets/images';
import { SafeAreaView, Typography } from '../_components';
import { ConfigUrl } from '../_config';
import { useStackNavigation, useToggle } from '../_hooks';
import { StorageKey } from '../_models';
import { storage } from '../storage';
import * as Styled from './style';

const Onboarding = () => {
  const [isChecked, toggleChecked] = useToggle(false);
  const navigation = useStackNavigation();
  const { height } = useWindowDimensions();

  const onPress = () => {
    storage.set(StorageKey.IsPolicyApproved, true);
    navigation.navigate('Login');
  };

  return (
    <SafeAreaView backgroundColor="neutral.0" isScrollable={false}>
      <Styled.TopContainer>
        <Styled.TitleText color="secondary.700" fontStyle="bold" size="large">
          {t('ONBOARDING.TITLE')}
        </Styled.TitleText>
        {height > 600 && <Styled.Image source={Counter} />}
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
        <Styled.ConfirmButton disabled={!isChecked} label={t('ONBOARDING.CONFIRM')} onPress={onPress} />
      </Styled.BottomContainer>
    </SafeAreaView>
  );
};

export default Onboarding;
