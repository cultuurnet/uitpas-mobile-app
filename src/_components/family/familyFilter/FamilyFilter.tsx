import { useRef } from 'react';
import { FlatList } from 'react-native';

import { useGetFamilyMembers } from '../../../onboarding/family/_queries';
import { TFamilyMember, TPassHolder } from '../../../profile/_models';
import * as Styled from './style';

type TProps = {
  selectedPassHolder: TPassHolder;
  setSelectedPassHolder: (selectedPassHolder: TPassHolder) => void;
};

export const FamilyFilter = ({ selectedPassHolder, setSelectedPassHolder }: TProps) => {
  const listRef = useRef<FlatList>();

  const { data: familyMembers = [] } = useGetFamilyMembers();

  const handleSelectPassHolder = (nextSelectedPassHolder: TPassHolder, nextSelectedIndex: number) => {
    if (selectedPassHolder.id !== nextSelectedPassHolder.id) {
      setSelectedPassHolder(nextSelectedPassHolder);
      listRef.current.scrollToIndex({ animated: true, index: nextSelectedIndex });
    }
  };

  const handlePressPrev = () => {
    const currentIndex = findCurrentIndexByPassHolder(familyMembers, selectedPassHolder);
    const nextPassHolder = findBoundedPassHolderByIndex(familyMembers, currentIndex - 1);
    setSelectedPassHolder(nextPassHolder);
  };

  const handleNextPrev = () => {
    const currentIndex = findCurrentIndexByPassHolder(familyMembers, selectedPassHolder);
    const nextPassHolder = findBoundedPassHolderByIndex(familyMembers, currentIndex + 1);
    setSelectedPassHolder(nextPassHolder);
  };

  return (
    <Styled.Container>
      <Styled.FilterPrevButton name="ChevronLeft" onPress={handlePressPrev} />
      <FlatList
        ItemSeparatorComponent={Styled.Separator}
        data={familyMembers}
        horizontal
        keyExtractor={item => item.uitpasNumber}
        ref={listRef}
        renderItem={({ item: familyMember, index }) => (
          <Styled.FilterItem
            isSelected={familyMember.passholder.id === selectedPassHolder.id}
            onPress={() => handleSelectPassHolder(familyMember.passholder, index)}
          >
            <Styled.FilterLabel
              color={familyMember.passholder.id === selectedPassHolder.id ? 'neutral.0' : 'primary.100'}
              fontStyle="bold"
              size="small"
            >
              {familyMember.passholder.firstName}
            </Styled.FilterLabel>
          </Styled.FilterItem>
        )}
        showsHorizontalScrollIndicator={false}
      />
      <Styled.FilterNextButton name="ChevronRight" onPress={handleNextPrev} />
    </Styled.Container>
  );
};

const findBoundedPassHolderByIndex = (familyMembers: TFamilyMember[], index: number) => {
  return familyMembers[Math.min(Math.max(index, 0), familyMembers.length - 1)].passholder;
};

const findCurrentIndexByPassHolder = (familyMembers: TFamilyMember[], passHolder: TPassHolder) => {
  return familyMembers.findIndex(member => member.passholder.id === passHolder.id);
};
