import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { ScrollView } from 'react-native';

import { BulletList, Button, DiagonalSplitView, Typography } from '../_components';
import { ConfigUrl } from '../_config';
import { useAuthentication } from '../_context';

const ProfileNotFound: FC = () => {
  const { user } = useAuthentication();
  const { t } = useTranslation();

  return (
    <DiagonalSplitView
      backgroundColor="turquoise"
      bottomContent={
        <ScrollView>
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
            <Button href={ConfigUrl.buy} inline label={t('PROFILE_NOT_FOUND.FORGOT_EMAIL_CTA')} variant="link" />
          </BulletList.Item>
          <BulletList.Item>
            <Typography bottomSpacing="8px">{t('PROFILE_NOT_FOUND.OTHER_ACCOUNT_TEXT')}</Typography>
            <Button href={ConfigUrl.buy} inline label={t('PROFILE_NOT_FOUND.OTHER_ACCOUNT_CTA')} />
          </BulletList.Item>
          <>
            <Typography align="center" bottomSpacing="8px">
              {t('PROFILE_NOT_FOUND.HELPDESK_TEXT')}
            </Typography>
            <Button centered href={ConfigUrl.helpdesk} inline label={t('PROFILE_NOT_FOUND.HELPDESK_CTA')} variant="link" />
          </>
        </ScrollView>
      }
      lineColor="primaryDark"
      topContent={
        <>
          <Typography align="center" bottomSpacing="8px" color="white">
            {t('PROFILE_NOT_FOUND.TITLE')}
          </Typography>
          <Typography align="center" color="white" fontStyle="bold" size="xxlarge">
            {user?.email}
          </Typography>
        </>
      }
    />
  );
};

export default ProfileNotFound;
