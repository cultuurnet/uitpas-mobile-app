import { FC } from 'react';
import { useTranslation } from 'react-i18next';

import { BulletList, Button, Typography } from '../_components';
import { ConfigUrl } from '../_config';

type TProps = {
  onLogout: () => void;
};

const ProfileNotFoundContent: FC<TProps> = ({ onLogout }) => {
  const { t } = useTranslation();

  return (
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
        <Button inline label={t('PROFILE_NOT_FOUND.OTHER_ACCOUNT_CTA')} onPress={onLogout} />
      </BulletList.Item>
      <>
        <Typography align="center" bottomSpacing="4px">
          {t('PROFILE_NOT_FOUND.HELPDESK_TEXT')}
        </Typography>
        <Button centered href={ConfigUrl.helpdesk} inline label={t('PROFILE_NOT_FOUND.HELPDESK_CTA')} variant="link" />
      </>
    </>
  );
};

export default ProfileNotFoundContent;
