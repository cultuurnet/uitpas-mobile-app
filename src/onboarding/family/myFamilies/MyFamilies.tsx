import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { FlatList } from 'react-native';

import { BlurredModal, Button, Typography } from '../../../_components';
import { queryClient } from '../../../_context';
import { formatISOString } from '../../../_utils';
import { TFamily } from '../../../profile/_models';
import { useGetMe } from '../../../profile/_queries/useGetMe';
import { useGetMyFamilies, useLeaveFamily } from '../_queries';
import { MyFamiliesBanner } from './_components/MyFamiliesBanner';
import * as Styled from './style';

export const MyFamilies = () => {
  const { t } = useTranslation();
  const [selectedFamily, setSelectedFamily] = useState<TFamily>();
  const { data: me } = useGetMe();
  const { data: families = [] } = useGetMyFamilies();
  const { mutateAsync: leaveFamily } = useLeaveFamily();

  const handleLeaveFamily = async () => {
    try {
      await leaveFamily({ path: `/passholders/${selectedFamily.passholderId}/family-members/${me.id}` });
      queryClient.invalidateQueries(['family-members']);
    } finally {
      setSelectedFamily(null);
    }
  };

  return (
    <>
      <FlatList
        ItemSeparatorComponent={Styled.Separator}
        ListFooterComponent={Styled.Separator}
        ListHeaderComponent={MyFamiliesBanner}
        data={families}
        keyExtractor={family => family.passholderId}
        renderItem={({ item: family }) => (
          <Styled.Tile>
            <Styled.Body>
              <Styled.Name color="primary.700" fontStyle="bold" size="small">
                {t('ONBOARDING.FAMILY.MY_FAMILIES.TILE.NAME', { name: `${family.firstName} ${family.name}` })}
              </Styled.Name>
              <Styled.Email size="small">{family.email}</Styled.Email>
              <Styled.DateAdded color="neutral.400">
                {t('ONBOARDING.FAMILY.MY_FAMILIES.TILE.ADDED', { date: formatISOString(family.memberSince) })}
              </Styled.DateAdded>
            </Styled.Body>
            <Styled.LeaveFamily>
              <Button
                color="error.700"
                fontSize="small"
                label={t('ONBOARDING.FAMILY.MY_FAMILIES.TILE.LEAVE')}
                onPress={() => setSelectedFamily(family)}
                radius={false}
                variant="link"
              />
            </Styled.LeaveFamily>
          </Styled.Tile>
        )}
      />
      <BlurredModal isVisible={!!selectedFamily} toggleIsVisible={() => setSelectedFamily(null)}>
        <Typography bottomSpacing="12px" fontStyle="bold" size="xlarge">
          {t('ONBOARDING.FAMILY.MY_FAMILIES.MODAL.TITLE')}
        </Typography>
        <Typography>{t('ONBOARDING.FAMILY.MY_FAMILIES.MODAL.DESCRIPTION')}</Typography>
        <Styled.FamilyCard>
          <Typography color="primary.700" fontStyle="bold" size="small">
            {t('ONBOARDING.FAMILY.MY_FAMILIES.MODAL.NAME', { name: `${selectedFamily?.firstName} ${selectedFamily?.name}` })}
          </Typography>
          <Typography size="small">{selectedFamily?.email}</Typography>
        </Styled.FamilyCard>
        <Styled.CloseButton
          backgroundColor="error.700"
          label={t('ONBOARDING.FAMILY.MY_FAMILIES.MODAL.CONFIRM')}
          onPress={handleLeaveFamily}
        />
        <Button
          color="primary.700"
          label={t('SHOP_DETAIL.REDEEM.MODAL_BUTTON_CANCEL')}
          onPress={() => setSelectedFamily(null)}
          variant="outline"
        />
      </BlurredModal>
    </>
  );
};
