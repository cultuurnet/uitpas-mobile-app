import { useEffect } from 'react';
import { Linking, Platform, StatusBar } from 'react-native';
import { t } from 'i18next';

import { Scan } from '../../_assets/images';
import { SafeAreaView } from '../../_components';
import { theme } from '../../_styles/theme';
import * as Styled from './style';

const CameraSettings = () => {
  useEffect(() => {
    if (Platform.OS === 'android') {
      StatusBar.setTranslucent(true);
      StatusBar.setBackgroundColor(theme.palette.neutral['100']);
    }
    StatusBar.setBarStyle('dark-content');
  }, []);
  return (
    <SafeAreaView backgroundColor="neutral.0" isScrollable={false}>
      <Styled.TopContainer>
        <Styled.TitleText align="center" color="secondary.700" fontStyle="bold" size="large">
          {t('SCAN.SETTINGS.TITLE')}
        </Styled.TitleText>
        <Styled.Image source={Scan} />
        <Styled.IntroText align="center" color="neutral.900">
          {t('SCAN.SETTINGS.DESCRIPTION')}
        </Styled.IntroText>
      </Styled.TopContainer>
      <Styled.BottomContainer>
        <Styled.ConfirmButton label={t('SCAN.SETTINGS.CTA')} onPress={() => Linking.openSettings()} />
      </Styled.BottomContainer>
    </SafeAreaView>
  );
};

export default CameraSettings;
