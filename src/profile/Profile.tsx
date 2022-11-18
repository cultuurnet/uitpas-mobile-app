import React, { useEffect, useState } from 'react';

import { LinkList, Typography } from '../_components';
import { TLinkListItem } from '../_components/linkList/LinkList';
import { useStackNavigation, useToggle } from '../_hooks';
import { TMainParams } from '../_routing/_components/MainNavigator';
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
  const { navigate } = useStackNavigation<TMainParams>();

  if (isPassHolderLoading) return null;

  const links: TLinkListItem[] = [
    { href: 'https://www.google.com', iconColor: 'teal', iconName: 'Gift', label: 'Mijn Welkomstvoordelen', labelColor: 'text' },
    { iconColor: 'teal', iconName: 'History', label: 'Mijn Historiek', labelColor: 'text', onPress: () => navigate('Shop') },
    { iconColor: 'red', iconName: 'Logout', label: 'Afmelden', labelColor: 'darkRed', onPress: toggleLogOutModalVisible },
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
          {/* @TODO: This is placeholder content */}
          <UitpasCard passHolder={passHolder} />
          {isMIANotificationVisible && <UitpasInfo onClose={() => setIsMIANotificationVisible(false)} />}
        </Styled.TopContainer>
        <LinkList items={links} />
        {!MIAInfoFirstActiveCard && <MIANotification socialTariffInfo={MIAInfoFirstActiveCard?.socialTariff} />}
      </Styled.SafeAreaViewContainer>
      <LogoutModal isVisible={logOutModalVisible} toggleIsVisible={toggleLogOutModalVisible} />
    </>
  );
};

export default Profile;
