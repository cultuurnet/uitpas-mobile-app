import { useCallback, useMemo, useRef } from 'react';
import { FlatList } from 'react-native';

import { useGetFamilyMembers } from '../../../onboarding/family/_queries';
import { TFamilyMember, TPassHolder } from '../../../profile/_models';
import * as Styled from './style';

type TProps = { selectedPassHolder: TPassHolder; setSelectedPassHolder: (selectedPassHolder: TPassHolder) => void };

export const FamilyFilter = ({ selectedPassHolder, setSelectedPassHolder }: TProps) => {
  const listRef = useRef<FlatList>(null);
  const { data: familyMembers = [] } = useGetFamilyMembers();

  const handleSelectPassHolder = useCallback(
    (nextSelectedPassHolder: TPassHolder, nextSelectedIndex: number) => {
      if (selectedPassHolder.id !== nextSelectedPassHolder.id) {
        setSelectedPassHolder(nextSelectedPassHolder);
        listRef.current?.scrollToIndex({ animated: true, index: nextSelectedIndex });
      }
    },
    [selectedPassHolder.id, setSelectedPassHolder],
  );

  const handlePressPrev = useCallback(() => {
    const currentIndex = findCurrentIndexByPassHolder(familyMembers, selectedPassHolder);
    const prevBoundedIndex = findBoundedIndex(familyMembers, currentIndex - 1);
    const prevPassHolder = familyMembers[prevBoundedIndex].passholder;
    handleSelectPassHolder(prevPassHolder, prevBoundedIndex);
  }, [familyMembers, handleSelectPassHolder, selectedPassHolder]);

  const handlePressNext = useCallback(() => {
    const currentIndex = findCurrentIndexByPassHolder(familyMembers, selectedPassHolder);
    const nextBoundedIndex = findBoundedIndex(familyMembers, currentIndex + 1);
    const nextPassHolder = familyMembers[nextBoundedIndex].passholder;
    handleSelectPassHolder(nextPassHolder, nextBoundedIndex);
  }, [familyMembers, handleSelectPassHolder, selectedPassHolder]);

  const PrevButton = useMemo(() => <Styled.FilterPrevButton name="ChevronLeft" onPress={handlePressPrev} />, [handlePressPrev]);
  const NextMember = useMemo(() => <Styled.FilterNextButton name="ChevronRight" onPress={handlePressNext} />, [handlePressNext]);

  return (
    <Styled.Container>
      {PrevButton}
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
      {NextMember}
    </Styled.Container>
  );
};

const findCurrentIndexByPassHolder = (familyMembers: TFamilyMember[], passHolder: TPassHolder) => {
  return familyMembers.findIndex(member => member.passholder.id === passHolder.id);
};

const findBoundedIndex = (familyMembers: TFamilyMember[], index: number) => {
  return Math.min(Math.max(index, 0), familyMembers.length - 1);
};
