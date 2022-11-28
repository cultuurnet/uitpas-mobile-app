import { FC } from 'react';
import { FlashList } from '@shopify/flash-list';

import { useGetHistory } from './_queries/useGetHistory';
import HistoryItem from './HistoryItem';
import * as Styled from './style';

const History: FC = () => {
  const { data, fetchNextPage } = useGetHistory();

  return (
    <Styled.ListView>
      <FlashList
        data={data?.pages?.flatMap(({ member }) => member) ?? []}
        estimatedItemSize={Styled.HISTORY_ITEM_HEIGHT}
        onEndReached={() => {
          fetchNextPage();
        }}
        onEndReachedThreshold={0.1}
        renderItem={({ item }) => <HistoryItem data={item} />}
      />
    </Styled.ListView>
  );
};

export default History;
