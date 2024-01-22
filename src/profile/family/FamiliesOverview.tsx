import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';

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
      <FamiliesOverviewTile
        description={t('PROFILE.FAMILY.FAMILY_COMPOSITION.DESCRIPTION')}
        icon="MainFamilyMember"
        onPress={() => navigation.navigate('FamilyOverview')}
        title={t('PROFILE.FAMILY.FAMILY_COMPOSITION.TITLE')}
      />
      <FamiliesOverviewTile
        description={t('PROFILE.FAMILY.OTHER_FAMILIES.DESCRIPTION')}
        icon="OtherFamilyMember"
        onPress={() => navigation.navigate('MyFamilies')}
        title={t('PROFILE.FAMILY.OTHER_FAMILIES.TITLE')}
      />
    </Styled.SafeAreaView>
  );
};

type TFamiliesOverviewTileProps = {
  description: string;
  icon: keyof typeof Icons;
  isFirst?: boolean;
  onPress: () => void;
  title: string;
};

const FamiliesOverviewTile: FC<TFamiliesOverviewTileProps> = ({ icon, title, description, isFirst, onPress }) => {
  return (
    <Styled.FamilyTile isFirst={isFirst} onPress={onPress}>
      <>
        <Icon name={icon} size={24} />
        <Styled.FamilyTileBody>
          <Typography color="primary.700" fontStyle="bold">
            {title}
          </Typography>
          <Styled.FamilyTileDescription size="small">{description}</Styled.FamilyTileDescription>
        </Styled.FamilyTileBody>
      </>
    </Styled.FamilyTile>
  );
};
