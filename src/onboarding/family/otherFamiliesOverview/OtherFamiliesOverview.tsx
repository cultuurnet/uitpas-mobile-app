import { useTranslation } from 'react-i18next';
import { FlatList } from 'react-native';

import { Button } from '../../../_components';
import { formatISOString } from '../../../_utils';
import { useGetMyFamilies } from '../_queries';
import { OtherFamiliesBanner } from './_components/OtherFamiliesBanner';
import * as Styled from './style';

export const OtherFamiliesOverview = () => {
  const { t } = useTranslation();

  const { data: families = [] } = useGetMyFamilies();

  return (
    <FlatList
      ItemSeparatorComponent={Styled.Separator}
      ListFooterComponent={Styled.Separator}
      ListHeaderComponent={OtherFamiliesBanner}
      data={families}
      keyExtractor={family => family.passholderId}
      renderItem={({ item: family }) => (
        <Styled.Tile>
          <Styled.Body>
            <Styled.Name color="primary.700" fontStyle="bold" size="small">
              {t('ONBOARDING.FAMILY.MY_FAMILIES.TILE.NAME', { name: family.name })}
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
              radius={false}
              variant="link"
            />
          </Styled.LeaveFamily>
        </Styled.Tile>
      )}
    />
  );
};
