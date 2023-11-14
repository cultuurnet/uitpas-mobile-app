import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { FlatList, ScrollView, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { Analytics, Icon } from '../../../_components';
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
  const formItems = useMemo(() => {
    const otherFamilyMembers =
      familyMembers
        ?.filter(({ mainFamilyMember }) => !mainFamilyMember)
        ?.map(item => ({ ...item, type: TFormItemType.FamilyMemberItem as const })) ?? [];
    return [
      ...otherFamilyMembers,
      { type: TFormItemType.AddFamilyMemberButton as const },
      otherFamilyMembers?.length % 2 === 0 && { type: TFormItemType.EmptyItem as const },
    ];
  }, [familyMembers]);

  const { bottom } = useSafeAreaInsets();
  const { t } = useTranslation();

  return (
    <>
      <Analytics screenName="FamilyOverview" />
      <ScrollView>
        <Styled.Header />
        <FlatList
          columnWrapperStyle={{ margin: 8 }}
          contentContainerStyle={{ paddingVertical: 8 }}
          data={formItems}
          numColumns={2}
          renderItem={({ item }) => {
            if (item.type === TFormItemType.FamilyMemberItem) {
              return (
                <Styled.FormItemContainer>
                  <Styled.FormItem>
                    <Styled.FamilyMemberAvatar source={{ uri: item.icon }} />
                    <Styled.FormItemLabel color="primary.700" fontStyle="semibold" numberOfLines={1}>
                      {item.firstName}
                    </Styled.FormItemLabel>
                  </Styled.FormItem>
                </Styled.FormItemContainer>
              );
            } else if (item.type === TFormItemType.AddFamilyMemberButton) {
              return (
                <Styled.FormItemButton onPress={() => navigation.navigate('AddFamilyMember')}>
                  <Styled.FormItem>
                    <Styled.AddIconContainer>
                      <Icon name="Plus" />
                    </Styled.AddIconContainer>
                    <Styled.FormItemLabel color="primary.700" fontStyle="semibold" numberOfLines={2}>
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
      </ScrollView>
      <View style={{ marginBottom: bottom }}>
        <Styled.ConfirmButton
          label={
            familyMembers?.filter(({ mainFamilyMember }) => !mainFamilyMember).length > 0
              ? t('ONBOARDING.FAMILY.OVERVIEW.DONE')
              : t('ONBOARDING.FAMILY.OVERVIEW.CANCEL')
          }
          onPress={() => {}}
        />
      </View>
    </>
  );
};
