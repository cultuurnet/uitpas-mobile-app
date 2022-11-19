import React, { useEffect, useState } from 'react';

import { LinkList, Typography } from '../_components';
import { TLinkListItem } from '../_components/linkList/LinkList';
import { useStackNavigation, useToggle } from '../_hooks';
import { TProfileParams } from '../_routing/_components/ProfileNavigator';
import i18n from '../_translations/i18n';
import { useGetMe } from './_queries/useGetMe';
import LogoutModal from './LogOutModal';
import MIANotification from './MIANotification/MIANotification';
import * as Styled from './style';
import UitpasCard from './UitpasCard/UitpasCard';
import UitpasInfo from './UitpasInfo/UitpasInfo';

const Profile = () => {
  const [logOutModalVisible, toggleLogOutModalVisible] = useToggle(false);
  const { data: passHolder, isLoading: isPassHolderLoading } = useGetMe();
  const [isMIANotificationVisible, setIsMIANotificationVisible] = useState(false);
  const { navigate } = useStackNavigation<TProfileParams>();

  if (isPassHolderLoading) return null;

  const links: TLinkListItem[] = [
    {
      href: 'https://www.google.com',
      iconColor: 'teal',
      iconName: 'Gift',
      label: i18n.t('PROFILE.LINKS.BENEFITS'),
      labelColor: 'text',
    },
    {
      iconColor: 'teal',
      iconName: 'Info',
      label: i18n.t('PROFILE.LINKS.ABOUT'),
      labelColor: 'text',
      onPress: () => navigate('About'),
    },
    {
      iconColor: 'red',
      iconName: 'Logout',
      label: i18n.t('PROFILE.LINKS.LOGOUT'),
      labelColor: 'darkRed',
      onPress: toggleLogOutModalVisible,
    },
  ];

  useEffect(() => {
    if (passHolder) setIsMIANotificationVisible(true);
  }, [passHolder]);

  const [MIAInfoFirstActiveCard] = passHolder.cardSystemMemberships.filter(card => card.status === 'ACTIVE' && card.socialTariff);

  return (
    <>
      <Styled.SafeAreaViewContainer edges={['top']} isScrollable>
        <Styled.TopContainer>
          <Typography fontStyle="bold" size="large">{`${i18n.t('PROFILE.HELLO')} ${passHolder.firstName}`}</Typography>
          <UitpasCard passHolder={passHolder} />
          {isMIANotificationVisible && <UitpasInfo onClose={() => setIsMIANotificationVisible(false)} />}
        </Styled.TopContainer>
        <LinkList items={links} />
        {MIAInfoFirstActiveCard && <MIANotification socialTariffInfo={MIAInfoFirstActiveCard?.socialTariff} />}
      </Styled.SafeAreaViewContainer>
      <LogoutModal isVisible={logOutModalVisible} toggleIsVisible={toggleLogOutModalVisible} />
    </>
  );
};

export default Profile;
