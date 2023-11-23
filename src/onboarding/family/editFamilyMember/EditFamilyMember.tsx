import { useMemo, useState } from 'react';
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
import DeleteFamilyMember from '../deleteFamilyMember/DeleteFamilyMember';
import * as Styled from './style';

type TProps = {
  navigation: TMainNavigationProp<'Profile'>;
  route: TRootStackRouteProp<'EditFamilyMember'>;
};

export const EditFamilyMember = ({ navigation, route }: TProps) => {
  const {
    member: { passholderId, firstName, uitpasNumber, icon, name },
    mainFamilyMember,
  } = route.params;

  const [selectedAvatar, setSelectedAvatar] = useState(getValidAvatarNameOrDefault(icon));
  const sortedAvatars = useMemo(() => {
    return [...Object.keys(EmojiAvatars), ...Object.keys(AnimalAvatars)];
  }, []);
  const { mutateAsync: editFamilyMember, isLoading } = useEditFamilyMember(passholderId);

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
        ListFooterComponent={!mainFamilyMember && <DeleteFamilyMember familyMemberId={passholderId} name={firstName} />}
        ListFooterComponentStyle={{ width: '100%' }}
        ListHeaderComponent={
          <Styled.Header>
            <Typography fontStyle="bold" numberOfLines={2} size="xxlarge">
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
        data={sortedAvatars}
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
