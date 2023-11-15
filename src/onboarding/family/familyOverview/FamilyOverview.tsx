import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { FlatList, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { getAvatarByNameOrDefault } from '../../../_assets/images';
import { Icon } from '../../../_components';
import { useOnboarding } from '../../../_context';
import { TMainNavigationProp } from '../../../_routing';
import { useGetFamilyMembers } from '../_queries/useGetFamilyMembers';
import * as Styled from './style';

type TProps = {
  navigation: TMainNavigationProp<'Profile'>;
};

enum TFormItemType {
  FamilyMemberItem,
  AddFamilyMemberButton,
  EmptyItem,
}

export const FamilyOverview = ({ navigation }: TProps) => {
  const { data: familyMembers } = useGetFamilyMembers();
  const me = useMemo(() => {
    return familyMembers?.filter(({ mainFamilyMember }) => mainFamilyMember)?.[0];
  }, [familyMembers]);
  const formItems = useMemo(() => {
    const otherFamilyMembers =
      familyMembers
        ?.filter(({ mainFamilyMember }) => !mainFamilyMember)
        ?.map(item => ({ ...item, type: TFormItemType.FamilyMemberItem as const })) ?? [];
    return [
      ...otherFamilyMembers,
      { type: TFormItemType.AddFamilyMemberButton as const },
      ...(otherFamilyMembers?.length % 2 === 0 ? [{ type: TFormItemType.EmptyItem } as const] : []),
    ];
  }, [familyMembers]);

  const { showFamilyOnboarding, dismissFamilyOnboarding } = useOnboarding();

  const { bottom } = useSafeAreaInsets();
  const { t } = useTranslation();

  const handleSubmit = () => {
    if (showFamilyOnboarding) {
      dismissFamilyOnboarding();
    }
  };

  return (
    <>
      <FlatList
        ListHeaderComponent={
          <Styled.Header>
            <Styled.MyAvatar source={getAvatarByNameOrDefault(me?.icon)} />
            <Styled.MyName color="neutral.0" fontStyle="semibold" numberOfLines={1}>
              {me?.firstName} {t('ONBOARDING.FAMILY.OVERVIEW.YOU')}
            </Styled.MyName>
          </Styled.Header>
        }
        columnWrapperStyle={{ margin: 8 }}
        contentContainerStyle={{ paddingBottom: 8 }}
        data={formItems}
        keyExtractor={item => `${item.type}${item.type === TFormItemType.FamilyMemberItem ? item.passholderId : ''}`}
        numColumns={2}
        renderItem={({ item: formItem }) => {
          if (formItem.type === TFormItemType.FamilyMemberItem) {
            return (
              <Styled.FormItemContainer>
                <Styled.FormItem>
                  <Styled.FamilyMemberAvatar source={getAvatarByNameOrDefault(formItem?.icon)} />
                  <Styled.FormItemLabel color="primary.700" fontStyle="semibold" numberOfLines={1}>
                    {formItem.firstName}
                  </Styled.FormItemLabel>
                </Styled.FormItem>
              </Styled.FormItemContainer>
            );
          } else if (formItem.type === TFormItemType.AddFamilyMemberButton) {
            return (
              <Styled.FormItemButton onPress={() => navigation.navigate('AddFamilyMember')}>
                <Styled.FormItem>
                  <Styled.AddIconContainer>
                    <Icon name="Plus" />
                  </Styled.AddIconContainer>
                  <Styled.FormItemLabel align="center" color="primary.700" fontStyle="semibold" numberOfLines={2}>
                    {t('ONBOARDING.FAMILY.OVERVIEW.ADD_MEMBER')}
                  </Styled.FormItemLabel>
                </Styled.FormItem>
              </Styled.FormItemButton>
            );
          } else {
            return <Styled.FormItemContainer />;
          }
        }}
      />
      <View style={{ marginBottom: bottom }}>
        <Styled.ConfirmButton
          label={
            familyMembers?.filter(({ mainFamilyMember }) => !mainFamilyMember).length > 0
              ? t('ONBOARDING.FAMILY.OVERVIEW.DONE')
              : t('ONBOARDING.FAMILY.OVERVIEW.CANCEL')
          }
          onPress={handleSubmit}
        />
      </View>
    </>
  );
};
