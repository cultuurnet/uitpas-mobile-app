import { useStackNavigation } from '../../../_hooks';
import { getAvatarByNameOrDefault } from '../../../_utils';
import { TFamilyMember } from '../../../profile/_models';
import * as Styled from './style';

type TProps = {
  familyMembers: TFamilyMember[];
};

export const FamilyUserPoints = ({ familyMembers }: TProps) => {
  const navigation = useStackNavigation();

  const numberOfAvatarsToShow = familyMembers.length > 3 ? 2 : familyMembers.length;
  const moreCount = familyMembers.length - numberOfAvatarsToShow;

  return (
    <Styled.Container onPress={() => navigation.navigate('MainNavigator', { screen: 'Profile' })}>
      {familyMembers.slice(0, numberOfAvatarsToShow).map((member, index) => (
        <Styled.AvatarImage
          key={member.passholder.id}
          resizeMode="contain"
          source={getAvatarByNameOrDefault(member.icon)}
          style={[{ zIndex: numberOfAvatarsToShow - index - 1 }, index > 0 && { marginLeft: -10 }]}
        />
      ))}
      {moreCount > 0 && (
        <Styled.MoreCount color="primary.700" fontStyle="semibold">
          +{moreCount}
        </Styled.MoreCount>
      )}
      <Styled.DropdownIcon name="ChevronDown" size={16} />
    </Styled.Container>
  );
};
