import React from 'react';
import { useTranslation } from 'react-i18next';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { ShopFaded } from '../../../_assets/images';
import { Button, Typography } from '../../../_components';
import { useOnboarding } from '../../../_context';
import * as Styled from './style';

export const FamilyInformation: React.FC = () => {
  const { top } = useSafeAreaInsets();
  const { dismissFamilyOnboarding } = useOnboarding();
  const { t } = useTranslation();

  return (
    <>
      <Styled.ArrowUp name="ArrowUp" size={120} />
      <Styled.BackgroundImage source={ShopFaded} />
      <Styled.SafeAreaView edges={['bottom']}>
        <Styled.ContentContainer>
          <Styled.CenteredView top={top}>
            <Typography color="neutral.0" fontStyle="bold" size="large">
              {t('ONBOARDING.FAMILY.INFORMATION.INFO_TITLE')}
            </Typography>
            <Styled.InfoText align="center" color="neutral.0">
              {t('ONBOARDING.FAMILY.INFORMATION.INFO')}
            </Styled.InfoText>
          </Styled.CenteredView>
        </Styled.ContentContainer>
        <Styled.ButtonContainer>
          <Button onPress={dismissFamilyOnboarding}>
            <Typography color="neutral.0" fontStyle="bold">
              {t('ONBOARDING.FAMILY.INFORMATION.CONTINUE')}
            </Typography>
          </Button>
        </Styled.ButtonContainer>
      </Styled.SafeAreaView>
    </>
  );
};
