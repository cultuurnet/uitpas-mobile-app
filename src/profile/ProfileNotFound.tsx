import { FC, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { EventArg } from '@react-navigation/native';

import { Analytics, DiagonalSplitView, Typography } from '../_components';
import { useAuthentication } from '../_context';
import { useStackNavigation } from '../_hooks';
import { log } from '../_utils/logger';
import ProfileNotFoundContent from './ProfileNotFoundContent';
import * as Styled from './style';

const ProfileNotFound: FC = () => {
  const { user, logout } = useAuthentication();
  const { t } = useTranslation();
  const navigation = useStackNavigation();

  useEffect(() => {
    const listener = (e: EventArg<'beforeRemove', true>) => {
      e.preventDefault();
      return;
    };
    navigation.addListener('beforeRemove', listener);

    return () => navigation.removeListener('beforeRemove', listener);
  }, [navigation]);

  const handleLogout = async () => {
    try {
      await logout();
    } catch (e) {
      // @TODO: general error handling?
      log.error(e);
    }
  };

  return (
    <>
      <Analytics screenName="ProfileNotFound" />
      <DiagonalSplitView
        backgroundColor="primary.700"
        bottomContent={<ProfileNotFoundContent onLogout={handleLogout} />}
        isScrollable
        lineColor="primary.800"
        topContent={
          <Styled.TopContent>
            <Styled.ErrorMessage align="center" bottomSpacing="8px" color="neutral.0">
              {t('PROFILE_NOT_FOUND.TITLE')}
            </Styled.ErrorMessage>
            <Typography align="center" color="neutral.0" fontStyle="bold" size="large">
              {user?.email}
            </Typography>
          </Styled.TopContent>
        }
      />
    </>
  );
};

export default ProfileNotFound;
