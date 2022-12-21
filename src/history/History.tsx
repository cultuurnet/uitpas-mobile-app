import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { RefreshControl } from 'react-native';
import { FlashList } from '@shopify/flash-list';

import { Spinner } from '../_components';
import { theme } from '../_styles/theme';
import { useGetHistory } from './_queries/useGetHistory';
import HistoryItem from './HistoryItem';
import * as Styled from './style';

const History: FC = () => {
  const { data: history, fetchNextPage, isLoading: isHistoryLoading, refetch, isRefetching } = useGetHistory();
  const { t } = useTranslation();

  if (isHistoryLoading) {
    return <Spinner />;
  }

  const members = history?.pages?.flatMap(({ member }) => member) ?? [];
  return (
    <Styled.ListView>
      {members.length > 0 ? (
        <>
          <FlashList
            contentContainerStyle={{ paddingTop: 20 }}
            data={members}
            estimatedItemSize={Styled.HISTORY_ITEM_HEIGHT}
            onEndReached={fetchNextPage}
            onEndReachedThreshold={0.1}
            refreshControl={
              <RefreshControl
                colors={[theme.palette.primary['500'], theme.palette.neutral['0']]}
                onRefresh={refetch}
                refreshing={isRefetching}
                tintColor={theme.palette.primary['500']}
              />
            }
            renderItem={({ item }) => <HistoryItem data={item} />}
          />
        </>
      ) : (
        <Styled.NoContentText align="center">{t('PROFILE.HISTORY.EMPTY')}</Styled.NoContentText>
      )}
    </Styled.ListView>
  );
};

export default History;
