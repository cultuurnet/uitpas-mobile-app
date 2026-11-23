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

  const handleSelectPassHolder = useCallback(
    (nextSelectedPassHolder: TPassHolder, nextSelectedIndex: number) => {
      setSelectedPassHolder(nextSelectedPassHolder);
      listRef.current?.scrollToIndex({ animated: true, index: nextSelectedIndex });
    },
    [setSelectedPassHolder],
  );

  const handlePressPrev = useCallback(() => {
    const prevIndex = currentIndex <= 0 ? familyMembers.length - 1 : currentIndex - 1;
    const prevPassHolder = familyMembers[prevIndex].passholder;
    if (prevPassHolder.id !== selectedPassHolder.id) {
      handleSelectPassHolder(prevPassHolder, prevIndex);
      announceStatus(
        t('SHOP.WELCOME.MEMBER_SELECTED', {
          name: prevPassHolder.firstName,
          position: prevIndex + 1,
          total: familyMembers.length,
        }),
      );
    }
  }, [currentIndex, familyMembers, handleSelectPassHolder, selectedPassHolder, t]);

  const handlePressNext = useCallback(() => {
    const nextIndex = currentIndex < 0 || currentIndex >= familyMembers.length - 1 ? 0 : currentIndex + 1;
    const nextPassHolder = familyMembers[nextIndex].passholder;
    if (nextPassHolder.id !== selectedPassHolder.id) {
      handleSelectPassHolder(nextPassHolder, nextIndex);
      announceStatus(
        t('SHOP.WELCOME.MEMBER_SELECTED', {
          name: nextPassHolder.firstName,
          position: nextIndex + 1,
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

  if (!familyMembers.length) return null;

  return (
    <Styled.Container>
      <Styled.FilterPrevButton
        accessibilityLabel={t('SHOP.WELCOME.PREVIOUS_MEMBER')}
        name="ChevronLeft"
        onPress={handlePressPrev}
      />
      <FlatList
        ItemSeparatorComponent={Styled.Separator}
        data={familyMembers}
        horizontal
        keyExtractor={item => item.uitpasNumber}
        ref={listRef}
        renderItem={renderItem}
        showsHorizontalScrollIndicator={false}
      />
      <Styled.FilterNextButton
        accessibilityLabel={t('SHOP.WELCOME.NEXT_MEMBER')}
        name="ChevronRight"
        onPress={handlePressNext}
      />
    </Styled.Container>
  );
};

const findCurrentIndexByPassHolder = (familyMembers: TFamilyMember[], passHolder: TPassHolder) => {
  if (!passHolder) return -1;
  return familyMembers.findIndex(member => member.passholder.id === passHolder.id);
};
