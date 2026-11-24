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
  const statusMessage = `${t('ONBOARDING.FAMILY.ADD_MEMBER.ERROR.TITLE')} ${route.params.description}`;

  const goToFamilyOverview = () => {
    navigation.popTo('FamilyOverview');
  };

  return (
    <SafeAreaView backgroundColor="neutral.0" barStyle="dark">
      <Styled.Body accessibilityLabel={statusMessage} accessible>
        <Icon color="error.600" name="Warning" size={48} />
        <Styled.Title
          accessible={false}
          align="center"
          color="error.600"
          fontStyle="bold"
          importantForAccessibility="no-hide-descendants"
          size="xxlarge"
        >
          {t('ONBOARDING.FAMILY.ADD_MEMBER.ERROR.TITLE')}
        </Styled.Title>
        <Styled.Description accessible={false} align="center" importantForAccessibility="no-hide-descendants">
          {route.params.description}
        </Styled.Description>
      </Styled.Body>
      <Styled.Footer>
        <Button label={t('ONBOARDING.FAMILY.ADD_MEMBER.ERROR.BACK_TO_FAMILY_OVERVIEW')} onPress={goToFamilyOverview} />
      </Styled.Footer>
    </SafeAreaView>
  );
};
