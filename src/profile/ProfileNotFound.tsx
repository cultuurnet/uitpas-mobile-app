import { FC } from 'react';
import { useTranslation } from 'react-i18next';

import { BulletList, Button, DiagonalSplitView, Typography } from '../_components';
import { ConfigUrl } from '../_config';
import { useAuthentication } from '../_context';
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
      bottomContent={
        <>
          <BulletList.Item>
            <Typography bottomSpacing="8px">{t('PROFILE_NOT_FOUND.REGISTER_TEXT')}</Typography>
            <Button href={ConfigUrl.register} inline label={t('PROFILE_NOT_FOUND.REGISTER_CTA')} variant="link" />
          </BulletList.Item>
          <BulletList.Item>
            <Typography bottomSpacing="8px">{t('PROFILE_NOT_FOUND.BUY_TEXT')}</Typography>
            <Button href={ConfigUrl.buy} inline label={t('PROFILE_NOT_FOUND.BUY_CTA')} variant="link" />
          </BulletList.Item>
          <BulletList.Item>
            <Typography bottomSpacing="8px">{t('PROFILE_NOT_FOUND.FORGOT_EMAIL_TEXT')}</Typography>
            <Button href={ConfigUrl.forgotEmail} inline label={t('PROFILE_NOT_FOUND.FORGOT_EMAIL_CTA')} variant="link" />
          </BulletList.Item>
          <BulletList.Item>
            <Typography bottomSpacing="8px">{t('PROFILE_NOT_FOUND.OTHER_ACCOUNT_TEXT')}</Typography>
            <Button inline label={t('PROFILE_NOT_FOUND.OTHER_ACCOUNT_CTA')} onPress={handleLogout} />
          </BulletList.Item>
          <>
            <Typography align="center" bottomSpacing="4px">
              {t('PROFILE_NOT_FOUND.HELPDESK_TEXT')}
            </Typography>
            <Button centered href={ConfigUrl.helpdesk} inline label={t('PROFILE_NOT_FOUND.HELPDESK_CTA')} variant="link" />
          </>
        </>
      }
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
