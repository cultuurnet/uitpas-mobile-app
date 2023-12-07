import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { View } from 'react-native';

import * as Icons from '../../_assets/icons';
import { Icon, Typography } from '../../_components';
import { TMainNavigationProp } from '../../_routing';
import * as Styled from './style';

type TFamiliesOverviewProps = {
  navigation: TMainNavigationProp<'Profile'>;
};

export const FamiliesOverview: FC<TFamiliesOverviewProps> = ({ navigation }) => {
  const { t } = useTranslation();

  return (
    <Styled.SafeAreaView edges={['bottom']}>
      <FamiliesOverviewItem
        description={t('PROFILE.FAMILY.FAMILY_COMPOSITION.DESCRIPTION')}
        icon="MainFamilyMember"
        onPress={() => navigation.navigate('FamilyOverview')}
        title={t('PROFILE.FAMILY.FAMILY_COMPOSITION.TITLE')}
      />
      <FamiliesOverviewItem
        description={t('PROFILE.FAMILY.MY_FAMILIES.DESCRIPTION')}
        icon="MainFamilyMember"
        onPress={() => navigation.navigate('MyFamilies')}
        title={t('PROFILE.FAMILY.MY_FAMILIES.TITLE')}
      />
    </Styled.SafeAreaView>
  );
};

type TFamiliesOverviewItemProps = {
  description: string;
  icon: keyof typeof Icons;
  onPress: () => void;
  title: string;
};

const FamiliesOverviewItem: FC<TFamiliesOverviewItemProps> = ({ icon, title, description, onPress }) => {
  return (
    <Styled.FamilyTile onPress={onPress}>
      <>
        <Icon name={icon} size={24} />
        <View>
          <Typography color="primary.700" fontStyle="bold">
            {title}
          </Typography>
          <Typography>{description}</Typography>
        </View>
      </>
    </Styled.FamilyTile>
  );
};
