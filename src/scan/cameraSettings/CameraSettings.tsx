import { Linking, StatusBar, useWindowDimensions } from 'react-native';
import { t } from 'i18next';

import { Scan } from '../../_assets/images';
import { SafeAreaView } from '../../_components';
import { theme } from '../../_styles/theme';
import * as Styled from './style';

const CameraSettings = () => {
  const { height } = useWindowDimensions();

  return (
    <SafeAreaView backgroundColor="neutral.0" isScrollable={false}>
      <StatusBar backgroundColor={theme.palette.neutral['0']} barStyle="dark-content" />

      <Styled.TopContainer>
        <Styled.TitleText align="center" color="secondary.700" fontStyle="bold" size="large">
          {t('SCAN.SETTINGS.TITLE')}
        </Styled.TitleText>
        {height > 600 && <Styled.Image source={Scan} />}
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
