import React, { useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Pressable } from 'react-native';

import { Analytics, EnlargedHeader, LinkList, Spinner } from '../_components';
import { TLinkListItem } from '../_components/linkList/LinkList';
import { ConfigUrl } from '../_config';
import { useToggle } from '../_hooks';
import { StorageKey } from '../_models';
import { TMainNavigationProp } from '../_routing/_components/TRootStackParamList';
import i18n from '../_translations/i18n';
import { storage } from '../storage';
import { useGetVersions } from '../update/_queries/useGetVersions';
import { useGetMe } from './_queries/useGetMe';
import CardModal from './CardModal/CardModal';
import LogoutModal from './LogOutModal';
import MIANotification from './MIANotification/MIANotification';
import * as Styled from './style';
import UitpasCard from './UitpasCard/UitpasCard';
import UitpasInfo from './UitpasInfo/UitpasInfo';
import UpdateNotification from './UpdateNotification/UpdateNotification';

type TProps = {
  navigation: TMainNavigationProp<'Profile'>;
};
const Profile = ({ navigation }: TProps) => {
  const [logOutModalVisible, toggleLogOutModalVisible] = useToggle(false);
  const { data: passHolder, isLoading: isPassHolderLoading } = useGetMe();
  const [isUitpasInfoClosed, setIsUitpasInfoClosed] = useState(storage.getBoolean(StorageKey.IsUitpasInfoClosed));
  const { t } = useTranslation();
  const [cardModalVisible, toggleCardModalVisible] = useToggle(false);

  const versions = useGetVersions();

  const rewardSectionLinks = useMemo<TLinkListItem[]>(
    () => [
      {
        iconName: 'Gift',
        label: i18n.t('PROFILE.LINKS.BENEFITS'),
        onPress: () => navigation.navigate('FilteredShop', { section: 'welkom', subtitle: t('PROFILE.WELCOME_GIFTS_TITLE') }),
      },
      {
        iconName: 'CircledCheck',
        label: i18n.t('PROFILE.LINKS.REDEEMED_REWARDS'),
        onPress: () => navigation.navigate('RedeemedRewards'),
      },
      {
        iconName: 'History',
        label: i18n.t('PROFILE.LINKS.HISTORY'),
        onPress: () => navigation.navigate('History'),
      },
    ],
    [t, navigation],
  );

  const genericProfileLinks = useMemo(() => {
    const links: TLinkListItem[] = [
      {
        href: ConfigUrl.personalInfo,
        iconName: 'ProfileCircled',
        label: i18n.t('PROFILE.LINKS.PERSONAL_INFO'),
      },
      {
        iconName: 'Family',
        label: i18n.t('PROFILE.LINKS.MY_FAMILY'),
        onPress: () => navigation.navigate('FamiliesOverview'),
      },
      {
        iconName: 'Info',
        label: i18n.t('PROFILE.LINKS.ABOUT'),
        onPress: () => navigation.navigate('About'),
      },
      {
        href: ConfigUrl.faq,
        iconName: 'Question',
        label: i18n.t('PROFILE.LINKS.FAQ'),
      },
      {
        iconColor: 'error.600',
        iconName: 'Logout',
        label: i18n.t('PROFILE.LINKS.LOGOUT'),
        labelColor: 'error.800',
        onPress: toggleLogOutModalVisible,
      },
    ];
    return links;
  }, [toggleLogOutModalVisible, navigation]);

  if (isPassHolderLoading) return <Spinner />;

  if (!passHolder) {
    navigation.navigate('ProfileNotFound');
    return null;
  }
  const [MIAInfoFirstActiveCard] = passHolder.cardSystemMemberships.filter(
    card => card.status === 'ACTIVE' && card.socialTariff && !card.socialTariff.expired,
  );
  return (
    <>
      <Analytics screenName="Profile" />
      <Styled.SafeAreaViewContainer edges={['left', 'right']} isScrollable>
        <Styled.TopContainer>
          <EnlargedHeader />
          <Pressable onPress={toggleCardModalVisible}>
            <UitpasCard passHolder={passHolder} />
          </Pressable>
          <CardModal isVisible={cardModalVisible} toggleIsVisible={toggleCardModalVisible} />

          {versions?.isBehindTarget && <UpdateNotification />}
          {!isUitpasInfoClosed && (
            <UitpasInfo
              onClose={() => {
                setIsUitpasInfoClosed(true);
                storage.set(StorageKey.IsUitpasInfoClosed, true);
              }}
            />
          )}
        </Styled.TopContainer>
        <Styled.BottomContainer>
          <LinkList items={rewardSectionLinks} />
          <Styled.Divider />
          {MIAInfoFirstActiveCard && <MIANotification socialTariffInfo={MIAInfoFirstActiveCard?.socialTariff} />}
          <LinkList items={genericProfileLinks} />
        </Styled.BottomContainer>
      </Styled.SafeAreaViewContainer>
      <LogoutModal isVisible={logOutModalVisible} toggleIsVisible={toggleLogOutModalVisible} />
    </>
  );
};

export default Profile;
