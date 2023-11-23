import React from 'react';

import { useStackNavigation, useToggle } from '../../_hooks';
import { getAvatarByNameOrDefault } from '../../_utils';
import { useGetFamilyMembers } from '../../onboarding/family/_queries';
import { useGetMe } from '../../profile/_queries/useGetMe';
import CardModal from '../../profile/CardModal/CardModal';
import Typography from '../typography/Typography';
import * as Styled from './style';

const UserPoints = () => {
  const navigation = useStackNavigation();
  const [cardModalVisible, toggleCardModalVisible] = useToggle(false);

  const { data: user, isLoading: isLoadingProfile, isError: isErrorProfile } = useGetMe();
  const { data: familyMembers, isLoading: isLoadingFamilyMembers, isError: isErrorFamilyMembers } = useGetFamilyMembers();

  if (isLoadingProfile || isLoadingFamilyMembers || isErrorProfile || isErrorFamilyMembers) {
    return null;
  }

  if (familyMembers.length === 1) {
    const initials = `${user.firstName?.[0] || ''}${user.name?.[0] || ''}`;

    return (
      <>
        <Styled.UserPointsButton activeOpacity={0.8} onPress={toggleCardModalVisible}>
          <>
            <Styled.PointsLabel allowFontScaling={false} color="neutral.0" fontStyle="bold" size="normal">
              {user.points}
            </Styled.PointsLabel>
            {!!initials && (
              <Styled.AvatarContainer>
                <Typography allowFontScaling={false} color="secondary.500" fontStyle="bold" size="xsmall">
                  {initials}
                </Typography>
              </Styled.AvatarContainer>
            )}
          </>
        </Styled.UserPointsButton>
        <CardModal isVisible={cardModalVisible} toggleIsVisible={toggleCardModalVisible} />
      </>
    );
  }

  if (familyMembers.length > 1) {
    const numberOfAvatarsToShow = familyMembers.length > 3 ? 2 : familyMembers.length;
    const moreCount = familyMembers.length - numberOfAvatarsToShow;

    return (
      <Styled.FamilyPointsButton onPress={() => navigation.navigate('MainNavigator', { screen: 'Profile' })}>
        {familyMembers.slice(0, numberOfAvatarsToShow).map((member, index) => (
          <Styled.AvatarImage
            key={member.passholder.id}
            resizeMode="contain"
            source={getAvatarByNameOrDefault(member.icon)}
            style={[{ zIndex: numberOfAvatarsToShow - index - 1 }, index > 0 && { marginLeft: -10 }]}
          />
        ))}
        {moreCount > 0 && (
          <Styled.MoreCount color="primary.700" fontStyle="semibold">
            +{moreCount}
          </Styled.MoreCount>
        )}
        <Styled.DropdownIcon name="Chevron" size={16} />
      </Styled.FamilyPointsButton>
    );
  }
};

export default UserPoints;
