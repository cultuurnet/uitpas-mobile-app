import { Linking } from 'react-native';
import { t } from 'i18next';

import { Scan } from '../../_assets/images';
import { SafeAreaView } from '../../_components';
import * as Styled from './style';

const CameraSettings = () => {
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
