import { useCallback, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Platform } from 'react-native';

import { Family } from '../../_assets/images';
import { SafeAreaView, Spinner, Typography } from '../../_components';
import { useOnboarding } from '../../_context';
import { StorageKey } from '../../_models';
import { TMainNavigationProp } from '../../_routing';
import { storage } from '../../storage';
import { useHasFamilyMembers } from './_queries/useHasFamilyMembers';
import * as Styled from './style';

const BULLET_ITEMS = [
  { text: 'ONBOARDING.FAMILY.BULLET_1' },
  { text: 'ONBOARDING.FAMILY.BULLET_2' },
  { text: 'ONBOARDING.FAMILY.BULLET_3' },
  { text: 'ONBOARDING.FAMILY.BULLET_4' },
];

type TProps = {
  navigation: TMainNavigationProp<'Profile'>;
};

export const FamilyOnboarding = ({ navigation }: TProps) => {
  const { isLoading, isFetched, data: hasFamilyMembers } = useHasFamilyMembers();

  const { dismissFamilyOnboarding } = useOnboarding();
  const resolveFamilyOnboarding = useCallback(() => {
    dismissFamilyOnboarding();
    storage.set(StorageKey.HasSeenFamilyOnboarding, true);
  }, [dismissFamilyOnboarding]);

  useEffect(() => {
    if (isFetched && hasFamilyMembers) {
      resolveFamilyOnboarding();
    }
  }, [hasFamilyMembers, isFetched, resolveFamilyOnboarding]);

  const { t } = useTranslation();

  const goToFamilyOverview = () => {
    navigation.navigate('AddFamilyMember');
    storage.set(StorageKey.HasSeenFamilyOnboarding, true);
  };

  if (isLoading) {
    return <Spinner statusBarStyle={Platform.OS === 'ios' ? 'dark-content' : 'light-content'} />;
  }

  return (
    <SafeAreaView backgroundColor="neutral.0" barStyle={Platform.OS === 'ios' ? 'dark-content' : 'light-content'}>
      <Styled.Body>
        <Styled.Title align="center" color="primary.800" fontStyle="bold" size="large">
          {t('ONBOARDING.FAMILY.TITLE')}
        </Styled.Title>
        <Styled.Hero source={Family} />
        <Styled.BulletList>
          {BULLET_ITEMS.map(({ text }, index) => (
            <Styled.BulletListItem key={index}>
              <Typography>{t(text)}</Typography>
            </Styled.BulletListItem>
          ))}
        </Styled.BulletList>
      </Styled.Body>
      <Styled.Footer>
        <Styled.ConfirmButton label={t('ONBOARDING.FAMILY.CONFIRM')} onPress={goToFamilyOverview} />
        <Styled.SkipButton
          color="primary.700"
          label={t('ONBOARDING.FAMILY.SKIP')}
          onPress={resolveFamilyOnboarding}
          variant="outline"
        />
      </Styled.Footer>
    </SafeAreaView>
  );
};
