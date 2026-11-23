import { useCallback, useMemo, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { FlatList } from 'react-native';

import { announceStatus } from '../../../_utils';
import { useGetFamilyMembers } from '../../../onboarding/family/_queries';
import { TFamilyMember, TPassHolder } from '../../../profile/_models';
import * as Styled from './style';

type TProps = { selectedPassHolder: TPassHolder; setSelectedPassHolder: (selectedPassHolder: TPassHolder) => void };

export const FamilyFilter = ({ selectedPassHolder, setSelectedPassHolder }: TProps) => {
  const listRef = useRef<FlatList>(null);
  const { t } = useTranslation();
  const { data: familyMembers = [] } = useGetFamilyMembers();
  const currentIndex = useMemo(
    () => findCurrentIndexByPassHolder(familyMembers, selectedPassHolder),
    [familyMembers, selectedPassHolder],
  );
  const isAtStart = currentIndex <= 0;
  const isAtEnd = currentIndex < 0 || currentIndex >= familyMembers.length - 1;

  const handleSelectPassHolder = useCallback(
    (nextSelectedPassHolder: TPassHolder, nextSelectedIndex: number) => {
      setSelectedPassHolder(nextSelectedPassHolder);
      listRef.current?.scrollToIndex({ animated: true, index: nextSelectedIndex });
    },
    [setSelectedPassHolder],
  );

  const handlePressPrev = useCallback(() => {
    const prevBoundedIndex = findBoundedIndex(familyMembers, currentIndex - 1);
    const prevPassHolder = familyMembers[prevBoundedIndex].passholder;
    if (prevPassHolder.id !== selectedPassHolder.id) {
      handleSelectPassHolder(prevPassHolder, prevBoundedIndex);
      announceStatus(
        t('SHOP.WELCOME.MEMBER_SELECTED', {
          name: prevPassHolder.firstName,
          position: prevBoundedIndex + 1,
          total: familyMembers.length,
        }),
      );
    }
  }, [currentIndex, familyMembers, handleSelectPassHolder, selectedPassHolder, t]);

  const handlePressNext = useCallback(() => {
    const nextBoundedIndex = findBoundedIndex(familyMembers, currentIndex + 1);
    const nextPassHolder = familyMembers[nextBoundedIndex].passholder;
    if (nextPassHolder.id !== selectedPassHolder.id) {
      handleSelectPassHolder(nextPassHolder, nextBoundedIndex);
      announceStatus(
        t('SHOP.WELCOME.MEMBER_SELECTED', {
          name: nextPassHolder.firstName,
          position: nextBoundedIndex + 1,
          total: familyMembers.length,
        }),
      );
    }
  }, [currentIndex, familyMembers, handleSelectPassHolder, selectedPassHolder, t]);

  const renderItem = useCallback(
    ({ item: familyMember, index }: { index: number; item: TFamilyMember }) => {
      const isSelected = familyMember.passholder.id === selectedPassHolder?.id;
      return (
        <Styled.FilterItem
          accessibilityLabel={t('SHOP.WELCOME.MEMBER_TAB', {
            name: familyMember.passholder.firstName,
            position: index + 1,
            total: familyMembers.length,
          })}
          accessibilityRole="tab"
          accessibilityState={{ selected: isSelected }}
          isSelected={isSelected}
          onPress={() => handleSelectPassHolder(familyMember.passholder, index)}
        >
          <Styled.FilterLabel color={isSelected ? 'neutral.0' : 'primary.100'} fontStyle="bold" size="small">
            {familyMember.passholder.firstName}
          </Styled.FilterLabel>
        </Styled.FilterItem>
      );
    },
    [familyMembers.length, handleSelectPassHolder, selectedPassHolder?.id, t],
  );

  const PrevButton = useMemo(
    () => (
      <Styled.FilterPrevButton
        accessibilityLabel={t('SHOP.WELCOME.PREVIOUS_MEMBER')}
        disabled={isAtStart}
        name="ChevronLeft"
        onPress={handlePressPrev}
      />
    ),
    [handlePressPrev, isAtStart, t],
  );
  const NextButton = useMemo(
    () => (
      <Styled.FilterNextButton
        accessibilityLabel={t('SHOP.WELCOME.NEXT_MEMBER')}
        disabled={isAtEnd}
        name="ChevronRight"
        onPress={handlePressNext}
      />
    ),
    [handlePressNext, isAtEnd, t],
  );

  if (!familyMembers.length) return null;

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
  if (!passHolder) return -1;
  return familyMembers.findIndex(member => member.passholder.id === passHolder.id);
};

const findBoundedIndex = (familyMembers: TFamilyMember[], index: number) => {
  return Math.min(Math.max(index, 0), familyMembers.length - 1);
};
