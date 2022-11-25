import React, { useMemo, useState } from 'react';

import { LinkList, Spinner, Typography } from '../_components';
import { TLinkListItem } from '../_components/linkList/LinkList';
import { ConfigUrl } from '../_config';
import { useStackNavigation, useToggle } from '../_hooks';
import { StorageKey } from '../_models';
import { TProfileParams } from '../_routing/_components/ProfileNavigator';
import { TRootParams } from '../_routing/_components/RootStackNavigator';
import i18n from '../_translations/i18n';
import { storage } from '../storage';
import { useGetMe } from './_queries/useGetMe';
import LogoutModal from './LogOutModal';
import MIANotification from './MIANotification/MIANotification';
import * as Styled from './style';
import UitpasCard from './UitpasCard/UitpasCard';
import UitpasInfo from './UitpasInfo/UitpasInfo';

const Profile = () => {
  const [logOutModalVisible, toggleLogOutModalVisible] = useToggle(false);
  const { data: passHolder, isLoading: isPassHolderLoading } = useGetMe();
  const [isUitpasInfoClosed, setIsUitpasInfoClosed] = useState(storage.getBoolean(StorageKey.IsUitpasInfoClosed));
  const { navigate } = useStackNavigation<TProfileParams & TRootParams>();

  const links: TLinkListItem[] = [
    {
      href: ConfigUrl.welcomeBenefits,
      iconName: 'Gift',
      label: i18n.t('PROFILE.LINKS.BENEFITS'),
    },
    {
      iconName: 'History',
      label: i18n.t('PROFILE.LINKS.HISTORY'),
      onPress: () => navigate('History'),
    },
    {
      href: ConfigUrl.personalInfo,
      iconName: 'ProfileCircled',
      label: i18n.t('PROFILE.LINKS.PERSONAL_INFO'),
    },
    {
      iconName: 'Info',
      label: i18n.t('PROFILE.LINKS.ABOUT'),
      onPress: () => navigate('About'),
    },
    {
      href: ConfigUrl.faq,
      iconName: 'Question',
      label: i18n.t('PROFILE.LINKS.FAQ'),
    },
    {
      iconColor: 'red',
      iconName: 'Logout',
      label: i18n.t('PROFILE.LINKS.LOGOUT'),
      labelColor: 'darkRed',
      onPress: toggleLogOutModalVisible,
    },
  ];

  if (isPassHolderLoading) return <Spinner />;
  if (!passHolder) {
    return navigate('ProfileNotFound');
  }
  const [MIAInfoFirstActiveCard] = passHolder.cardSystemMemberships.filter(card => card.status === 'ACTIVE' && card.socialTariff);

  return (
    <>
      <Styled.SafeAreaViewContainer edges={['top']} isScrollable>
        <Styled.TopContainer>
          <Typography fontStyle="bold" size="large">
            {i18n.t('PROFILE.HELLO', { name: passHolder.firstName })}
          </Typography>
          <UitpasCard passHolder={passHolder} />
          {!isUitpasInfoClosed && (
            <UitpasInfo
              onClose={() => {
                setIsUitpasInfoClosed(true);
                storage.set(StorageKey.IsUitpasInfoClosed, true);
              }}
            />
          )}
        </Styled.TopContainer>
        <LinkList items={links} />
        {MIAInfoFirstActiveCard && <MIANotification socialTariffInfo={MIAInfoFirstActiveCard?.socialTariff} />}
      </Styled.SafeAreaViewContainer>
      <LogoutModal isVisible={logOutModalVisible} toggleIsVisible={toggleLogOutModalVisible} />
    </>
  );
};

export default Profile;
