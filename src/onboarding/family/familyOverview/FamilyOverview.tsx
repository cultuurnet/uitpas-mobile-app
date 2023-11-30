import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { FlatList, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { Icon, TouchableRipple } from '../../../_components';
import { useOnboarding } from '../../../_context';
import { TMainNavigationProp } from '../../../_routing';
import { getAvatarByNameOrDefault } from '../../../_utils';
import { useGetFamilyMembers } from '../_queries';
import * as Styled from './style';

type TProps = {
  navigation: TMainNavigationProp<'Profile'>;
};

enum TFormItemType {
  FamilyMemberItem,
  FamilyMemberAddButton,
}

export const FamilyOverview = ({ navigation }: TProps) => {
  const { bottom } = useSafeAreaInsets();
  const { t } = useTranslation();

  const { data: familyMembers } = useGetFamilyMembers();
  const me = useMemo(() => {
    return familyMembers?.filter(({ mainFamilyMember }) => mainFamilyMember)?.[0];
  }, [familyMembers]);
  const formItems = useMemo(() => {
    const otherFamilyMembers =
      familyMembers
        ?.filter(({ mainFamilyMember }) => !mainFamilyMember)
        ?.map(item => ({ ...item, type: TFormItemType.FamilyMemberItem as const })) ?? [];
    return [...otherFamilyMembers, { type: TFormItemType.FamilyMemberAddButton as const }];
  }, [familyMembers]);
  const { showFamilyOnboarding } = useOnboarding();

  const handleSubmit = () => {
    showFamilyOnboarding ? navigation.navigate('FamilyInformation') : navigation.goBack();
  };

  return (
    <>
      <FlatList
        ListHeaderComponent={
          <Styled.Header>
            <Styled.HeaderContent onPress={() => navigation.navigate('EditFamilyMember', { member: me })}>
              <>
                <View>
                  <Styled.MyAvatar resizeMode="contain" source={getAvatarByNameOrDefault(me?.icon)} />
                  <Styled.EditProfileIconContainer>
                    <Icon color="neutral.0" name="Edit" size={12} />
                  </Styled.EditProfileIconContainer>
                </View>
                <Styled.MyName color="neutral.0" fontStyle="semibold" numberOfLines={1}>
                  {me?.passholder?.firstName} {t('ONBOARDING.FAMILY.OVERVIEW.YOU')}
                </Styled.MyName>
              </>
            </Styled.HeaderContent>
          </Styled.Header>
        }
        columnWrapperStyle={{ margin: 8 }}
        contentContainerStyle={{ paddingBottom: 8 }}
        data={formItems}
        keyExtractor={item => `${item.type}${item.type === TFormItemType.FamilyMemberItem ? item.passholder.id : ''}`}
        numColumns={2}
        renderItem={({ item: formItem }) => {
          if (formItem.type === TFormItemType.FamilyMemberItem) {
            return (
              <Styled.FormItemButtonWrapper>
                <TouchableRipple borderless onPress={() => navigation.navigate('EditFamilyMember', { member: formItem })}>
                  <Styled.FormItem>
                    <View>
                      <Styled.FamilyMemberAvatar resizeMode="contain" source={getAvatarByNameOrDefault(formItem?.icon)} />
                      <Styled.EditProfileIconContainer>
                        <Icon color="neutral.0" name="Edit" size={12} />
                      </Styled.EditProfileIconContainer>
                    </View>
                    <Styled.FormItemLabel color="primary.700" fontStyle="semibold" numberOfLines={1}>
                      {formItem.passholder.firstName}
                    </Styled.FormItemLabel>
                  </Styled.FormItem>
                </TouchableRipple>
              </Styled.FormItemButtonWrapper>
            );
          } else if (formItem.type === TFormItemType.FamilyMemberAddButton) {
            return (
              <>
                <Styled.FormItemButtonWrapper>
                  <TouchableRipple borderless onPress={() => navigation.navigate('AddFamilyMember', { familyMembers })}>
                    <Styled.FormItem>
                      <Styled.FormItemBody>
                        <Styled.AddIconContainer>
                          <Icon name="Plus" />
                        </Styled.AddIconContainer>
                      </Styled.FormItemBody>
                      <Styled.FormItemLabel align="center" color="primary.700" fontStyle="semibold" numberOfLines={2}>
                        {t('ONBOARDING.FAMILY.OVERVIEW.ADD_MEMBER')}
                      </Styled.FormItemLabel>
                    </Styled.FormItem>
                  </TouchableRipple>
                </Styled.FormItemButtonWrapper>
                {familyMembers?.length % 2 === 1 && <Styled.FormItemContainer />}
              </>
            );
          }
          return null;
        }}
      />
      <View style={{ marginBottom: bottom }}>
        <Styled.ConfirmButton
          label={familyMembers?.length > 1 ? t('ONBOARDING.FAMILY.OVERVIEW.DONE') : t('ONBOARDING.FAMILY.OVERVIEW.CANCEL')}
          onPress={handleSubmit}
        />
      </View>
    </>
  );
};
