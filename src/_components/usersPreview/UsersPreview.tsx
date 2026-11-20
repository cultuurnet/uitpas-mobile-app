import { useMemo, useState } from 'react';

import { useToggle } from '../../_hooks';
import { getAvatarByNameOrDefault } from '../../_utils';
import { useGetFamilyMembers } from '../../onboarding/family/_queries';
import { useGetMe } from '../../profile/_queries/useGetMe';
import CardModal from '../../profile/UitpasCards/CardModal/CardModal';
import * as Styled from './style';

const UsersPreview = () => {
  const { data: me, isLoading: isLoadingMe, isError: isErrorMe } = useGetMe();
  const { data: familyMembers = [], isLoading: isLoadingFamilyMembers, isError: isErrorFamilyMembers } = useGetFamilyMembers();
  const [cardModalVisible, toggleCardModalVisible] = useToggle(false);
  const [selectedIndex, setSelectedIndex] = useState(0);

  const members = useMemo(
    () => familyMembers.map(member => (member.mainFamilyMember && me ? { ...member, passholder: me } : member)),
    [familyMembers, me],
  );

  if (isLoadingMe || isLoadingFamilyMembers || isErrorMe || isErrorFamilyMembers || !familyMembers.length) {
    return null;
  }

  const firstMember = familyMembers[0];
  const isSingleUser = familyMembers.length === 1;
  const numberOfAvatarsToShow = familyMembers.length > 3 ? 2 : familyMembers.length;
  const moreCount = familyMembers.length - numberOfAvatarsToShow;
  const safeIndex = Math.min(selectedIndex, members.length - 1);
  const selectedMember = members[safeIndex];

  const openCardModal = () => {
    setSelectedIndex(0);
    toggleCardModalVisible();
  };

  return (
    <>
      <Styled.Container $isSingleUser={isSingleUser} activeOpacity={isSingleUser ? 0.8 : 0.2} onPress={openCardModal}>
        {isSingleUser ? (
          <>
            <Styled.Points allowFontScaling={false} fontStyle="bold" size="normal">
              {me.points}
            </Styled.Points>
            <Styled.AvatarImage contentFit="contain" source={getAvatarByNameOrDefault(firstMember.icon)} />
          </>
        ) : (
          <>
            {familyMembers.slice(0, numberOfAvatarsToShow).map((member, index) => (
              <Styled.AvatarImage
                contentFit="contain"
                key={member.passholder.id}
                source={getAvatarByNameOrDefault(member.icon)}
                style={[{ zIndex: numberOfAvatarsToShow - index - 1 }, index > 0 && { marginLeft: -10 }]}
              />
            ))}
            {moreCount > 0 && (
              <Styled.MoreCount color="primary.700" fontStyle="semibold">
                +{moreCount}
              </Styled.MoreCount>
            )}
          </>
        )}
      </Styled.Container>
      {isSingleUser ? (
        <CardModal icon={undefined} isVisible={cardModalVisible} passHolder={me} toggleIsVisible={toggleCardModalVisible} />
      ) : (
        <CardModal
          icon={selectedMember.icon}
          isVisible={cardModalVisible}
          paging={{
            currentIndex: safeIndex,
            onNext: () =>
              setSelectedIndex(index => {
                const currentIndex = Math.min(index, members.length - 1);
                return (currentIndex + 1) % members.length;
              }),
            onPrevious: () =>
              setSelectedIndex(index => {
                const currentIndex = Math.min(index, members.length - 1);
                return (currentIndex - 1 + members.length) % members.length;
              }),
            total: members.length,
          }}
          passHolder={selectedMember.passholder}
          toggleIsVisible={toggleCardModalVisible}
        />
      )}
    </>
  );
};

export default UsersPreview;
