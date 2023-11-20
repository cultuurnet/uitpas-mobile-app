import { useTranslation } from 'react-i18next';

import { Button, Icon, SafeAreaView } from '../../../../_components';
import { TMainNavigationProp, TRootStackRouteProp } from '../../../../_routing';
import * as Styled from './style';

type TProps = {
  navigation: TMainNavigationProp<'Profile'>;
  route: TRootStackRouteProp<'AddFamilyMemberError'>;
};

export const AddFamilyMemberError = ({ navigation, route }: TProps) => {
  const { t } = useTranslation();

  const goToFamilyOverview = () => {
    navigation.navigate('FamilyOverview');
  };

  return (
    <SafeAreaView backgroundColor="neutral.0" barStyle="dark-content">
      <Styled.Body>
        <Icon color="error.600" name="Warning" size={48} />
        <Styled.Title align="center" color="error.600" fontStyle="bold" size="xxlarge">
          {t('ONBOARDING.FAMILY.ADD_MEMBER.ERROR.TITLE')}
        </Styled.Title>
        <Styled.Description align="center">{route.params.description}</Styled.Description>
      </Styled.Body>
      <Styled.Footer>
        <Button label={t('ONBOARDING.FAMILY.ADD_MEMBER.ERROR.BACK_TO_FAMILY_OVERVIEW')} onPress={goToFamilyOverview} />
      </Styled.Footer>
    </SafeAreaView>
  );
};
