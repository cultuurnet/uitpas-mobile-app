import { useRef } from 'react';
import { FlatList } from 'react-native';

import { useGetFamilyMembers } from '../../../onboarding/family/_queries';
import Typography from '../../typography/Typography';
import * as Styled from './style';

type TProps = {
  selectedIndex: number;
  setSelectedIndex: (selectedIndex: number) => void;
};

export const FamilyFilter = ({ selectedIndex, setSelectedIndex }: TProps) => {
  const listRef = useRef<FlatList>();

  const { data: familyMembers = [] } = useGetFamilyMembers();

  const handleSelectItem = nextSelectedIndex => {
    if (selectedIndex !== nextSelectedIndex) {
      setSelectedIndex(nextSelectedIndex);
      listRef.current.scrollToIndex({ animated: true, index: nextSelectedIndex });
    }
  };

  return (
    <Styled.Container>
      <Styled.FilterPrevButton name="ChevronLeft" onPress={() => handleSelectItem(selectedIndex - 1)} />
      <FlatList
        ItemSeparatorComponent={Styled.Separator}
        data={familyMembers}
        horizontal
        keyExtractor={item => item.uitpasNumber}
        ref={listRef}
        renderItem={({ item: familyMember, index }) => (
          <Styled.FilterItem isSelected={selectedIndex === index} onPress={() => handleSelectItem(index)}>
            <Typography color={selectedIndex === index ? 'neutral.0' : 'primary.100'} fontStyle="bold" size="small">
              {familyMember.passholder.firstName}
            </Typography>
          </Styled.FilterItem>
        )}
        showsHorizontalScrollIndicator={false}
      />
      <Styled.FilterNextButton name="ChevronRight" onPress={() => handleSelectItem(selectedIndex + 1)} />
    </Styled.Container>
  );
};
