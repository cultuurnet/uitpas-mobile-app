import { useState } from 'react';
import { FlatList, Pressable, useWindowDimensions } from 'react-native';

import { useToggle } from '../../_hooks';
import { useGetFamilyMembers } from '../../onboarding/family/_queries';
import { TPassHolder } from '../_models';
import CardModal from './CardModal/CardModal';
import * as Styled from './style';
import { CARD_ITEM_DIVIDER_WIDTH, CARD_ITEM_SCALE } from './style';
import { getCardWidth } from './UitpasCard/style';
import UitpasCard from './UitpasCard/UitpasCard';

export const UitpasCards = () => {
  const { width: screenWidth } = useWindowDimensions();
  const [cardModalVisible, toggleCardModalVisible] = useToggle(false);
  const [selectedPassHolder, setSelectedPassHolder] = useState<TPassHolder>(null);

  const { data: familyMembers } = useGetFamilyMembers();

  const handleCardPress = (passHolder: TPassHolder) => {
    setSelectedPassHolder(passHolder);
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
        renderItem={({ item: { icon, passholder: passHolder } }) => (
          <Pressable onPress={() => handleCardPress(passHolder)}>
            <UitpasCard icon={familyMembers.length > 1 ? icon : null} passHolder={passHolder} scale={CARD_ITEM_SCALE} />
          </Pressable>
        )}
        showsHorizontalScrollIndicator={false}
        snapToAlignment="start"
        snapToInterval={getCardWidth(screenWidth, CARD_ITEM_SCALE) + CARD_ITEM_DIVIDER_WIDTH}
      />
      <CardModal isVisible={cardModalVisible} passHolder={selectedPassHolder} toggleIsVisible={toggleCardModalVisible} />
    </>
  );
};
