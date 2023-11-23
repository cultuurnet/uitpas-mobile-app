import { useState } from 'react';
import { FlatList, Pressable, useWindowDimensions } from 'react-native';

import { useToggle } from '../../_hooks';
import { useGetFamilyMembers } from '../../onboarding/family/_queries';
import { TFamilyMember } from '../_models';
import CardModal from './CardModal/CardModal';
import * as Styled from './style';
import { CARD_ITEM_DIVIDER_WIDTH, CARD_ITEM_SCALE } from './style';
import { getCardWidth } from './UitpasCard/style';
import UitpasCard from './UitpasCard/UitpasCard';

export const UitpasCards = () => {
  const { width: screenWidth } = useWindowDimensions();
  const [cardModalVisible, toggleCardModalVisible] = useToggle(false);
  const [selectedFamilyMember, setSelectedFamilyMember] = useState<TFamilyMember>(null);

  const { data: familyMembers } = useGetFamilyMembers();

  const handlePressCard = (familyMember: TFamilyMember) => {
    setSelectedFamilyMember(familyMember);
    toggleCardModalVisible();
  };

  return (
    <>
      <FlatList
        ItemSeparatorComponent={() => <Styled.CardItemDivider />}
        contentContainerStyle={{ paddingHorizontal: 20 }}
        data={familyMembers}
        horizontal
        keyExtractor={item => item.uitpasNumber}
        renderItem={({ item: familyMember }) => (
          <Pressable onPress={() => handlePressCard(familyMember)}>
            <UitpasCard
              icon={familyMembers.length > 1 ? familyMember.icon : null}
              passHolder={familyMember.passholder}
              scale={familyMembers.length > 1 ? CARD_ITEM_SCALE : 1}
            />
          </Pressable>
        )}
        showsHorizontalScrollIndicator={false}
        snapToAlignment="start"
        snapToInterval={getCardWidth(screenWidth, CARD_ITEM_SCALE) + CARD_ITEM_DIVIDER_WIDTH}
      />
      <CardModal
        icon={familyMembers.length > 1 ? selectedFamilyMember?.icon : null}
        isVisible={cardModalVisible}
        passHolder={selectedFamilyMember?.passholder}
        toggleIsVisible={toggleCardModalVisible}
      />
    </>
  );
};
