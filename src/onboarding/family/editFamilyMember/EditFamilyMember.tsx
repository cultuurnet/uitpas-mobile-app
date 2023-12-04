import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { FlatList } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import * as AnimalAvatars from '../../../_assets/images/avatars/animalAvatars';
import * as EmojiAvatars from '../../../_assets/images/avatars/emojiAvatars';
import { Button, Typography } from '../../../_components';
import { queryClient } from '../../../_context';
import { TMainNavigationProp, TRootStackRouteProp } from '../../../_routing';
import { applyBarcodeMask, getAvatarByNameOrDefault, getValidAvatarNameOrDefault } from '../../../_utils';
import { useEditFamilyMember } from '../_queries';
import * as Styled from './style';

const SORTED_AVATARS = [...Object.keys(EmojiAvatars), ...Object.keys(AnimalAvatars)];

type TProps = {
  navigation: TMainNavigationProp<'Profile'>;
  route: TRootStackRouteProp<'EditFamilyMember'>;
};

export const EditFamilyMember = ({ navigation, route }: TProps) => {
  const {
    member: {
      passholder: { id: passHolderId, firstName, name },
      uitpasNumber,
      mainFamilyMember,
      icon,
    },
  } = route.params;

  const [selectedAvatar, setSelectedAvatar] = useState(getValidAvatarNameOrDefault(icon));
  const { mutateAsync: editFamilyMember, isLoading } = useEditFamilyMember(passHolderId);

  const { bottom } = useSafeAreaInsets();
  const { t } = useTranslation();

  const handleSubmit = async () => {
    await editFamilyMember({ body: { icon: selectedAvatar } });
    queryClient.invalidateQueries(['family-members']);
    navigation.goBack();
  };

  return (
    <Styled.ScreenContainer>
      <FlatList
        ListFooterComponent={
          !mainFamilyMember && <Styled.DeleteFamilyMemberButton familyMemberId={passHolderId} name={firstName} />
        }
        ListFooterComponentStyle={{ width: '100%' }}
        ListHeaderComponent={
          <Styled.Header>
            <Typography align="center" fontStyle="bold" size="xxlarge">
              {`${firstName} ${name}`}
            </Typography>
            <Styled.UitpasNumber color="primary.700" fontStyle="bold">
              {applyBarcodeMask(uitpasNumber)}
            </Styled.UitpasNumber>
            <Styled.SelectedAvatarImage resizeMode="contain" source={getAvatarByNameOrDefault(selectedAvatar)} />
            <Styled.Description color="primary.700" fontStyle="semibold">
              {t('ONBOARDING.FAMILY.EDIT_MEMBER.DESCRIPTION')}
            </Styled.Description>
          </Styled.Header>
        }
        columnWrapperStyle={{ padding: 8 }}
        contentContainerStyle={{ alignItems: 'center', paddingHorizontal: 8 }}
        data={SORTED_AVATARS}
        numColumns={5}
        renderItem={({ item: avatar }) => (
          <Styled.AvatarItemBorder isSelected={avatar === selectedAvatar} onPress={() => setSelectedAvatar(avatar)}>
            <Styled.AvatarItemContainer>
              <Styled.AvatarItemImage resizeMode="contain" source={getAvatarByNameOrDefault(avatar)} />
            </Styled.AvatarItemContainer>
          </Styled.AvatarItemBorder>
        )}
      />
      <Styled.StickyFooter style={{ marginBottom: bottom + 16 }}>
        <Button label={t('ONBOARDING.FAMILY.EDIT_MEMBER.SAVE')} loading={isLoading} onPress={handleSubmit} />
      </Styled.StickyFooter>
    </Styled.ScreenContainer>
  );
};
