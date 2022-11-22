import { FC, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { EventArg } from '@react-navigation/native';

import { DiagonalSplitView, Typography } from '../_components';
import { useAuthentication } from '../_context';
import { useStackNavigation } from '../_hooks';
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
      console.error(e);
    }
  };

  return (
    <DiagonalSplitView
      backgroundColor="turquoise"
      bottomContent={<ProfileNotFoundContent onLogout={handleLogout} />}
      isScrollable
      lineColor="primaryDark"
      topContent={
        <>
          <Styled.ErrorMessage align="center" bottomSpacing="8px" color="white">
            {t('PROFILE_NOT_FOUND.TITLE')}
          </Styled.ErrorMessage>
          <Typography align="center" color="white" fontStyle="bold" size="xxlarge">
            {user?.email}
          </Typography>
        </>
      }
    />
  );
};

export default ProfileNotFound;
