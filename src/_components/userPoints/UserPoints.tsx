import React from 'react'

import { useToggle } from '../../_hooks';
import { useGetMe } from '../../profile/_queries/useGetMe';
import CardModal from '../../profile/CardModal/CardModal';
import Typography from '../typography/Typography';
import * as Styled from './style';

const UserPoints = () => {
  const { data: user, isLoading, isError } = useGetMe();
  const [cardModalVisible, toggleCardModalVisible] = useToggle(false);
  const firstActiveCard = user?.cardSystemMemberships?.filter(card => card.status === 'ACTIVE' && card.uitpasNumber)?.[0];

  if (isLoading || isError) return null;
  const initials = `${user.firstName?.[0] || ''}${user.name?.[0] || ''}`;
  return (
    <>
      <Styled.UserPointsButton activeOpacity={0.8} onPress={toggleCardModalVisible}>
        <>
          <Styled.PointsLabel allowFontScaling={false} color="neutral.0" fontStyle='bold' size="large" >{user.points}</Styled.PointsLabel>
          {!!initials && <Styled.AvatarContainer>
            <Typography allowFontScaling={false} color="secondary.500" fontStyle='bold' size="xsmall">{initials}</Typography>
          </Styled.AvatarContainer>}
        </>
      </Styled.UserPointsButton>
      <CardModal firstActiveCard={firstActiveCard} isVisible={cardModalVisible} toggleIsVisible={toggleCardModalVisible} />
    </>
  )
}

export default UserPoints;