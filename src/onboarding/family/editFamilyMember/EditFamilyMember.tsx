import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { FlatList } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import * as AnimalAvatars from '../../../_assets/images/avatars/animalAvatars';
import * as EmojiAvatars from '../../../_assets/images/avatars/emojiAvatars';
import { Analytics, Button, Typography } from '../../../_components';
import { queryClient } from '../../../_context';
import { TMainNavigationProp, TRootStackRouteProp } from '../../../_routing';
import {
  announceStatus,
  applyBarcodeMask,
  getAvatarAltTextKey,
  getAvatarByNameOrDefault,
  getValidAvatarNameOrDefault,
} from '../../../_utils';
import { useEditFamilyMember } from '../_queries';
import * as Styled from './style';

const SORTED_AVATARS = [...Object.keys(EmojiAvatars), ...Object.keys(AnimalAvatars)];

type TProps = { navigation: TMainNavigationProp<'Profile'>; route: TRootStackRouteProp<'EditFamilyMember'> };

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
  const { mutateAsync: editFamilyMember, isPending } = useEditFamilyMember(passHolderId);

  const { bottom } = useSafeAreaInsets();
  const { t } = useTranslation();

  const handleSelectAvatar = (avatar: string) => {
    if (avatar === selectedAvatar) return;
    setSelectedAvatar(avatar);
    announceStatus(t('ONBOARDING.FAMILY.EDIT_MEMBER.AVATAR_SELECTED', { name: t(getAvatarAltTextKey(avatar)) }));
  };

  const handleSubmit = async () => {
    await editFamilyMember({ body: { icon: selectedAvatar } });
    queryClient.invalidateQueries({ queryKey: ['family'] });
    navigation.goBack();
  };

  return (
    <>
      <Analytics screenName="EditFamilyMember" />
      <Styled.ScreenContainer>
        <FlatList
          ListFooterComponent={
            !mainFamilyMember && (
              <Styled.DeleteFamilyMemberButton
                familyMemberId={passHolderId}
                firstName={firstName}
                fullName={`${firstName} ${name}`}
              />
            )
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
              <Styled.SelectedAvatarImage
                accessibilityElementsHidden
                accessible={false}
                contentFit="contain"
                importantForAccessibility="no"
                source={getAvatarByNameOrDefault(selectedAvatar)}
              />
              <Styled.Description color="primary.700" fontStyle="semibold">
                {t('ONBOARDING.FAMILY.EDIT_MEMBER.DESCRIPTION', { firstName })}
              </Styled.Description>
            </Styled.Header>
          }
          columnWrapperStyle={{ padding: 8 }}
          contentContainerStyle={{ alignItems: 'center', paddingHorizontal: 8 }}
          data={SORTED_AVATARS}
          numColumns={5}
          renderItem={({ item: avatar }) => (
            <Styled.AvatarItemBorder
              accessibilityLabel={t(getAvatarAltTextKey(avatar))}
              accessibilityRole="button"
              accessibilityState={{ selected: avatar === selectedAvatar }}
              isSelected={avatar === selectedAvatar}
              onPress={() => handleSelectAvatar(avatar)}
            >
              <Styled.AvatarItemContainer
                accessibilityElementsHidden
                accessible={false}
                importantForAccessibility="no-hide-descendants"
              >
                <Styled.AvatarItemImage accessible={false} contentFit="contain" source={getAvatarByNameOrDefault(avatar)} />
              </Styled.AvatarItemContainer>
            </Styled.AvatarItemBorder>
          )}
        />
        <Styled.StickyFooter style={{ marginBottom: bottom + 16 }}>
          <Button label={t('ONBOARDING.FAMILY.EDIT_MEMBER.SAVE')} loading={isPending} onPress={handleSubmit} />
        </Styled.StickyFooter>
      </Styled.ScreenContainer>
    </>
  );
};
