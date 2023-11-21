import { useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { FlatList } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import * as Avatars from '../../../_assets/images/avatars';
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
  const { member } = route.params;

  const [selectedAvatar, setSelectedAvatar] = useState(getValidAvatarNameOrDefault(member.icon));
  const sortedAvatars = useMemo(() => {
    const avatars = Object.keys(Avatars).slice();
    avatars.sort((item, item2) => {
      if (item.includes('Emoji') && !item2.includes('Emoji')) {
        return -1;
      }
      if (item2.includes('Emoji') && !item.includes('Emoji')) {
        return 1;
      }
      return item.localeCompare(item2);
    });
    return avatars;
  }, []);
  const { mutate: editFamilyMember } = useEditFamilyMember(member.passholderId);

  const { bottom } = useSafeAreaInsets();
  const { t } = useTranslation();

  const handleSubmit = () => {
    editFamilyMember({ body: { icon: selectedAvatar } });
    queryClient.invalidateQueries(['family-members']);
    navigation.goBack();
  };

  return (
    <Styled.ScreenContainer>
      <FlatList
        ListFooterComponent={<DeleteFamilyMember familyMemberId={member.passholderId} name={member.firstName} />}
        ListFooterComponentStyle={{ width: '100%' }}
        ListHeaderComponent={
          <Styled.Header>
            <Typography fontStyle="bold" numberOfLines={1} size="xxlarge">
              {member.firstName}
            </Typography>
            <Styled.UitpasNumber color="primary.700" fontStyle="bold">
              {applyBarcodeMask(member.uitpasNumber)}
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
        <Button label={t('ONBOARDING.FAMILY.EDIT_MEMBER.SAVE')} onPress={handleSubmit} />
      </Styled.StickyFooter>
    </Styled.ScreenContainer>
  );
};
