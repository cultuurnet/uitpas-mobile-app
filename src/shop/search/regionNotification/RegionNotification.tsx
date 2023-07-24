import React, { FC } from 'react';
import { ScrollView } from 'react-native';

import { Button, ButtonTrans, Trans, Typography } from '../../../_components';
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
          <ButtonTrans
            buttonOnPress={onPress}
            defaults={`Er zijn ook nog {{amount}} voordelen gevonden van organisatoren buiten jouw regio. \n<button>{{region}}</button>`}
            parent={Typography}
            values={{ amount: searchOutOfRegionResults?.pages?.[0]?.totalItems, region: 'Zoek ook buiten mijn regio' }}
          />
        </Styled.NotificationContainer>
      </ScrollView>
    </>
  );
};
