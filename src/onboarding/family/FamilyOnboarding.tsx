import { useEffect } from 'react';
import { Platform, useWindowDimensions } from 'react-native';
import { t } from 'i18next';

import { Family } from '../../_assets/images';
import { Analytics, SafeAreaView, Spinner, Typography } from '../../_components';
import { useOnboarding } from '../../_context';
import { StorageKey } from '../../_models';
import { storage } from '../../storage';
import { useHasFamilyMembers } from './_queries/useHasFamilyMembers';
import * as Styled from './style';

const BULLET_ITEMS = [
  { text: 'ONBOARDING.FAMILY.TEXT_1' },
  { text: 'ONBOARDING.FAMILY.TEXT_2' },
  { text: 'ONBOARDING.FAMILY.TEXT_3' },
  { text: 'ONBOARDING.FAMILY.TEXT_4' },
];

export const FamilyOnboarding = () => {
  const { isLoading, isFetchedAfterMount, data: hasFamilyMembers } = useHasFamilyMembers();
  const { dismissFamilyOnboarding } = useOnboarding();

  useEffect(() => {
    if (isFetchedAfterMount) {
      storage.set(StorageKey.HasSeenFamilyOnboarding, true);
      if (hasFamilyMembers) {
        dismissFamilyOnboarding();
      }
    }
  }, [dismissFamilyOnboarding, hasFamilyMembers, isFetchedAfterMount]);

  const { height: windowHeight } = useWindowDimensions();

  if (isLoading) {
    return <Spinner statusBarStyle={Platform.OS === 'ios' ? 'dark-content' : 'light-content'} />;
  }

  return (
    <>
      <Analytics screenName="FamilyOnboarding" />
      <SafeAreaView
        backgroundColor="neutral.0"
        barStyle={Platform.OS === 'ios' ? 'dark-content' : 'light-content'}
        isScrollable={false}
      >
        <Styled.Body>
          <Styled.Title align="center" color="primary.800" fontStyle="bold" size="large">
            {t('ONBOARDING.FAMILY.TITLE')}
          </Styled.Title>
          {windowHeight > 700 && <Styled.Hero source={Family} />}
          <Styled.BulletList>
            {BULLET_ITEMS.map(({ text }, index) => (
              <Styled.BulletListItem key={index}>
                <Typography>{t(text)}</Typography>
              </Styled.BulletListItem>
            ))}
          </Styled.BulletList>
        </Styled.Body>
        <Styled.Footer>
          <Styled.ConfirmButton disabled label={t('ONBOARDING.FAMILY.CONFIRM')} onPress={() => {}} />
          <Styled.SkipButton
            color="primary.700"
            label={t('ONBOARDING.FAMILY.SKIP')}
            onPress={dismissFamilyOnboarding}
            variant="outline"
          />
        </Styled.Footer>
      </SafeAreaView>
    </>
  );
};
