import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { FlashList } from '@shopify/flash-list';

import { Spinner } from '../_components';
import { useGetHistory } from './_queries/useGetHistory';
import HistoryItem from './HistoryItem';
import * as Styled from './style';

const History: FC = () => {
  const { data: history, fetchNextPage, isLoading: isHistoryLoading } = useGetHistory();
  const { t } = useTranslation();

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
        <Styled.NoContentText>{t('PROFILE.HISTORY.EMPTY')}</Styled.NoContentText>
      )}
    </Styled.ListView>
  );
};

export default History;
