import React, { FC } from 'react';
import { ScrollView } from 'react-native';

import { Button, Typography } from '../../../_components';
import { TSearchFilters } from '../../_models/searchFilters';
import { useGetRewards } from '../../_queries/useGetRewards';
import * as Styled from './style';

type TProps = {
  filters: TSearchFilters;
  onPress: () => void;
  search: string;
};

export const RegionNotification: FC<TProps> = ({ onPress, filters, search }) => {
  const { data: searchOutOfRegionResults } = useGetRewards({
    enabled: !filters.includeAllCardSystems && search.length > 0,
    filters: { ...filters, includeAllCardSystems: true },
    freeText: search,
  });
  return (
    <>
      <ScrollView>
        <Styled.NotificationContainer>
          <Typography bottomSpacing="15px" color="secondary.900">
            {`Er zijn ook nog ${searchOutOfRegionResults?.pages?.[0]?.totalItems} voordelen gevonden van organisatoren buiten jouw regio`}
          </Typography>
          <Button inline label={'Zoek ook buiten mijn regio'} onPress={onPress} />
        </Styled.NotificationContainer>
      </ScrollView>
    </>
  );
};
