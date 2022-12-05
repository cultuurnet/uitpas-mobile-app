import { FC } from 'react';
import { FlashList } from '@shopify/flash-list';

import { Spinner } from '../_components';
import { useGetHistory } from './_queries/useGetHistory';
import HistoryItem from './HistoryItem';
import * as Styled from './style';

const History: FC = () => {
  const { data: history, fetchNextPage, isLoading: isHistoryLoading } = useGetHistory();

  if (isHistoryLoading) {
    return <Spinner />;
  }

  return (
    <Styled.ListView>
      {history.pages.length > 0 ? (
        <FlashList
          data={history?.pages?.flatMap(({ member }) => member) ?? []}
          estimatedItemSize={Styled.HISTORY_ITEM_HEIGHT}
          onEndReached={fetchNextPage}
          onEndReachedThreshold={0.1}
          renderItem={({ item }) => <HistoryItem data={item} />}
        />
      ) : (
        <Styled.NoContentText>Je hebt nog geen punten gespaard of voordelen ingewisseld.</Styled.NoContentText>
      )}
    </Styled.ListView>
  );
};

export default History;
