import React from 'react';
import { Platform } from 'react-native';
import { Config } from 'react-native-config';

import { Button, Typography } from '../_components';
import { TLinkListItem } from '../_components/linkList/LinkList';
import { ConfigUrl } from '../_config';
import i18n from '../_translations/i18n';
import * as Styled from './style';

const appStoreLink = 'itms-apps://apps.apple.com/be/app/uitpas/id1249270326?l=nl';
const playStoreLink = 'market://details?id=be.cultuurnet.uitpasapp';

const links: TLinkListItem[] = [
  {
    href: ConfigUrl.termsOfService,
    iconColor: 'teal',
    iconName: 'External',
    label: i18n.t('PROFILE.ABOUT.TERMS_OF_SERVICE'),
    labelColor: 'text',
  },
  {
    href: ConfigUrl.privacyPolicy,
    iconColor: 'teal',
    iconName: 'External',
    label: i18n.t('PROFILE.ABOUT.PRIVACY_POLICY'),
    labelColor: 'text',
  },
  {
    href: Platform.OS === 'ios' ? appStoreLink : playStoreLink,
    iconColor: 'teal',
    iconName: 'External',
    label: i18n.t('PROFILE.ABOUT.CHECK_FOR_UPDATES'),
    labelColor: 'text',
  },
];

const About = () => {
  return (
    <>
      <Styled.ListContainer items={links} title={`Versie ${Config.REACT_NATIVE_APP_VERSION_NR}`} />
      <Styled.NotificationContainer>
        <Typography bottomSpacing="20px" color="darkGreen">
          {i18n.t('PROFILE.ABOUT.CONSTRUCTION_WARNING')}
        </Typography>
        <Button href={ConfigUrl.helpdesk} inline label={i18n.t('PROFILE.ABOUT.REPORT_PROBLEM')} />
      </Styled.NotificationContainer>
    </>
  );
};

export default About;
