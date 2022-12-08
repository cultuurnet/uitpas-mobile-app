import React, { useEffect } from 'react';
import { Platform, ScrollView, StatusBar } from 'react-native';
import { Config } from 'react-native-config';

import { Button, Typography } from '../_components';
import LinkList, { TLinkListItem } from '../_components/linkList/LinkList';
import { ConfigUrl } from '../_config';
import { theme } from '../_styles/theme';
import i18n from '../_translations/i18n';
import * as Styled from './style';

const links: TLinkListItem[] = [
  {
    href: ConfigUrl.termsOfService,
    iconName: 'External',
    label: i18n.t('PROFILE.ABOUT.TERMS_OF_SERVICE'),
  },
  {
    href: ConfigUrl.privacyPolicy,
    iconName: 'External',
    label: i18n.t('PROFILE.ABOUT.PRIVACY_POLICY'),
  },
  {
    href: Platform.OS === 'ios' ? ConfigUrl.appStore : ConfigUrl.playStore,
    iconName: 'External',
    label: i18n.t('PROFILE.ABOUT.CHECK_FOR_UPDATES'),
  },
];

const About = () => {
  useEffect(() => {
    if (Platform.OS === 'android') {
      StatusBar.setBackgroundColor(theme.palette.primary['500']);
    }
    StatusBar.setBarStyle('light-content');
  }, []);

  return (
    <ScrollView>
      <LinkList items={links} title={i18n.t('PROFILE.ABOUT.VERSION', { version: Config.REACT_NATIVE_APP_VERSION_NR })} />
      <Styled.NotificationContainer>
        <Typography bottomSpacing="20px" color="secondary.900">
          {i18n.t('PROFILE.ABOUT.CONSTRUCTION_WARNING')}
        </Typography>
        <Button href={ConfigUrl.helpdesk} inline label={i18n.t('PROFILE.ABOUT.REPORT_PROBLEM')} />
      </Styled.NotificationContainer>
    </ScrollView>
  );
};

export default About;
