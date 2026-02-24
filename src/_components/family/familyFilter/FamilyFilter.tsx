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
      setSelectedPassHolder(nextSelectedPassHolder);
      listRef.current?.scrollToIndex({ animated: true, index: nextSelectedIndex });
    },
    [setSelectedPassHolder],
  );

  const handlePressPrev = useCallback(() => {
    const currentIndex = findCurrentIndexByPassHolder(familyMembers, selectedPassHolder);
    const prevBoundedIndex = findBoundedIndex(familyMembers, currentIndex - 1);
    const prevPassHolder = familyMembers[prevBoundedIndex].passholder;
    if (prevPassHolder.id !== selectedPassHolder.id) {
      handleSelectPassHolder(prevPassHolder, prevBoundedIndex);
    }
  }, [familyMembers, handleSelectPassHolder, selectedPassHolder]);

  const handlePressNext = useCallback(() => {
    const currentIndex = findCurrentIndexByPassHolder(familyMembers, selectedPassHolder);
    const nextBoundedIndex = findBoundedIndex(familyMembers, currentIndex + 1);
    const nextPassHolder = familyMembers[nextBoundedIndex].passholder;
    if (nextPassHolder.id !== selectedPassHolder.id) {
      handleSelectPassHolder(nextPassHolder, nextBoundedIndex);
    }
  }, [familyMembers, handleSelectPassHolder, selectedPassHolder]);

  const renderItem = useCallback(
    ({ item: familyMember, index }: { index: number; item: TFamilyMember }) => {
      const isSelected = familyMember.passholder.id === selectedPassHolder.id;
      return (
        <Styled.FilterItem isSelected={isSelected} onPress={() => handleSelectPassHolder(familyMember.passholder, index)}>
          <Styled.FilterLabel color={isSelected ? 'neutral.0' : 'primary.100'} fontStyle="bold" size="small">
            {familyMember.passholder.firstName}
          </Styled.FilterLabel>
        </Styled.FilterItem>
      );
    },
    [handleSelectPassHolder, selectedPassHolder.id],
  );

  const PrevButton = useMemo(() => <Styled.FilterPrevButton name="ChevronLeft" onPress={handlePressPrev} />, [handlePressPrev]);
  const NextButton = useMemo(() => <Styled.FilterNextButton name="ChevronRight" onPress={handlePressNext} />, [handlePressNext]);

  return (
    <Styled.Container>
      {PrevButton}
      <FlatList
        ItemSeparatorComponent={Styled.Separator}
        data={familyMembers}
        horizontal
        keyExtractor={item => item.uitpasNumber}
        ref={listRef}
        renderItem={renderItem}
        showsHorizontalScrollIndicator={false}
      />
      {NextButton}
    </Styled.Container>
  );
};

const findCurrentIndexByPassHolder = (familyMembers: TFamilyMember[], passHolder: TPassHolder) => {
  return familyMembers.findIndex(member => member.passholder.id === passHolder.id);
};

const findBoundedIndex = (familyMembers: TFamilyMember[], index: number) => {
  return Math.min(Math.max(index, 0), familyMembers.length - 1);
};
