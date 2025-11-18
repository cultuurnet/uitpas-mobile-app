import { useStackNavigation } from '../../../_hooks';
import { getAvatarByNameOrDefault } from '../../../_utils';
import { TFamilyMember } from '../../../profile/_models';
import * as Styled from './style';

type TProps = {
  members: TFamilyMember[];
};

export const FamilyUserPoints = ({ members }: TProps) => {
  const navigation = useStackNavigation();

  const numberOfAvatarsToShow = members.length > 3 ? 2 : members.length;
  const moreCount = members.length - numberOfAvatarsToShow;

  return (
    <Styled.Container onPress={() => navigation.navigate('MainNavigator', { screen: 'Profile' })}>
      {members.slice(0, numberOfAvatarsToShow).map((member, index) => (
        <Styled.AvatarImage
          key={member.passholder.id}
          contentFit="contain"
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
