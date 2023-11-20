import React from 'react';
import { useTranslation } from 'react-i18next';
import { View } from 'react-native';

import { Icon, Typography } from '../../_components';
import { TMainNavigationProp } from '../../_routing';
import * as Styled from './style';

type TProps = {
  navigation: TMainNavigationProp<'Profile'>;
};
export const FamiliesOverview: React.FC<TProps> = ({ navigation }) => {
  const { t } = useTranslation();

  return (
    <Styled.SafeAreaView edges={['bottom']}>
      <Styled.FamilyTile onPress={() => navigation.navigate('FamilyOverview')}>
        <Icon name="MainFamilyMember" size={24} />
        <View>
          <Typography color="primary.700" fontStyle="bold">
            {t('PROFILE.FAMILY.FAMILY_COMPOSITION.TITLE')}
          </Typography>
          <Typography>{t('PROFILE.FAMILY.FAMILY_COMPOSITION.DESCRIPTION')}</Typography>
        </View>
      </Styled.FamilyTile>
    </Styled.SafeAreaView>
  );
};
