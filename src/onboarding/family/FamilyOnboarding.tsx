import { useCallback, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

import { Family } from '../../_assets/images';
import { Analytics, Button, SafeAreaView, Spinner, Trans } from '../../_components';
import { useOnboarding, useTracking } from '../../_context';
import { StorageKey } from '../../_models';
import { TMainNavigationProp } from '../../_routing';
import { openExternalURL } from '../../_utils';
import { storage } from '../../storage';
import { useHasFamilyMembers } from './_queries';
import * as Styled from './style';

type TProps = {
  navigation: TMainNavigationProp<'Profile'>;
};

export const FamilyOnboarding = ({ navigation }: TProps) => {
  const { isLoading, isFetched, data: hasFamilyMembers } = useHasFamilyMembers();
  const { trackSelfDescribingEvent } = useTracking();

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
    trackSelfDescribingEvent('buttonClick', {
      button_name: 'start-family',
    });
    navigation.navigate('FamilyOverview');
    storage.set(StorageKey.HasSeenFamilyOnboarding, true);
  };

  if (isLoading) {
    return <Spinner statusBarStyle="dark" />;
  }

  return (
    <>
      {isFetched && !hasFamilyMembers && <Analytics screenName={'FamilyOnboarding'} />}
      <SafeAreaView backgroundColor="neutral.0" barStyle="dark">
        <Styled.Body>
          <Styled.Title align="center" color="primary.800" fontStyle="bold" size="large">
            {t('ONBOARDING.FAMILY.TITLE')}
          </Styled.Title>
          <Styled.Hero source={Family} />
          <Styled.BulletList>
            {getBulletItems(4).map(({ textKey }, index) => (
              <Styled.BulletListItem key={index}>
                <Trans
                  i18nKey={textKey}
                  onButtonPress={() => openExternalURL(t(`ONBOARDING.FAMILY.BULLET_${index + 1}_LINK`))}
                  selectable
                />
              </Styled.BulletListItem>
            ))}
          </Styled.BulletList>
        </Styled.Body>
        <Styled.Footer>
          <Styled.ConfirmButton label={t('ONBOARDING.FAMILY.CONFIRM')} onPress={goToFamilyOverview} />
          <Button
            color="primary.700"
            label={t('ONBOARDING.FAMILY.SKIP')}
            onPress={() => {
              trackSelfDescribingEvent('buttonClick', {
                button_name: 'skip-family',
              });
              resolveFamilyOnboarding();
            }}
            variant="outline"
          />
        </Styled.Footer>
      </SafeAreaView>
    </>
  );
};

const getBulletItems = numberOfBulletItems => {
  return [...Array(numberOfBulletItems).keys()].map(index => {
    return { textKey: `ONBOARDING.FAMILY.BULLET_${index + 1}_TEXT` };
  });
};
