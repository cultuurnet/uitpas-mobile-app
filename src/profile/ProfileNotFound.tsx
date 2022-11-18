import { FC } from 'react';
import { useTranslation } from 'react-i18next';

import { DiagonalSplitView, Typography } from '../_components';
import { useAuthentication } from '../_context';
import ProfileNotFoundContent from './ProfileNotFoundContent';
import * as Styled from './style';

const ProfileNotFound: FC = () => {
  const { user, logout } = useAuthentication();
  const { t } = useTranslation();

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
