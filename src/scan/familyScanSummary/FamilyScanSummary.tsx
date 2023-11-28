import { useTranslation } from 'react-i18next';

import { SafeAreaView } from '../../_components';
import { TRootStackNavigationProp } from '../../_routing';
import * as Styled from './style';

type TProps = {
  navigation: TRootStackNavigationProp<'FamilyScanSummary'>;
};

export const FamilyScanSummary = ({ navigation }: TProps) => {
  const { t } = useTranslation();

  return (
    <SafeAreaView backgroundColor="neutral.0" edges={['bottom']} isScrollable={false}>
      <Styled.Body />
      <Styled.CloseButton
        label={t('SCAN.FAMILY_MEMBERS.SUMMARY.CLOSE')}
        onPress={() => navigation.reset({ index: 0, routes: [{ name: 'MainNavigator', params: { screen: 'Profile' } }] })}
      />
    </SafeAreaView>
  );
};
