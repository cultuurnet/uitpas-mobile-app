import { FC, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { RefreshControl } from 'react-native';
import { FlashList } from '@shopify/flash-list';

import { Analytics, FamilyFilter, Spinner } from '../_components';
import { theme } from '../_styles/theme';
import { useGetMe } from '../profile/_queries/useGetMe';
import { useGetHistory } from './_queries/useGetHistory';
import HistoryItem from './HistoryItem';
import * as Styled from './style';

const History: FC = () => {
  const { t } = useTranslation();

  const { data: me } = useGetMe();
  const [selectedPassHolder, setSelectedPassHolder] = useState(me);
  const [isRefetchingByUser, setIsRefetchingByUser] = useState(false);
  const {
    data: history,
    fetchNextPage,
    isLoading: isHistoryLoading,
    refetch,
  } = useGetHistory({ passHolder: selectedPassHolder });

  async function refetchByUser() {
    setIsRefetchingByUser(true);

    try {
      await refetch();
    } finally {
      setIsRefetchingByUser(false);
    }
  }

  if (isHistoryLoading) {
    return <Spinner />;
  }

  const members = history?.pages?.flatMap(({ member }) => member) ?? [];
  return (
    <>
      <Analytics screenName="History" />
      <FamilyFilter selectedPassHolder={selectedPassHolder} setSelectedPassHolder={setSelectedPassHolder} />
      <Styled.ListView>
        <FlashList
          ListEmptyComponent={<Styled.NoContentText align="center">{t('PROFILE.HISTORY.EMPTY')}</Styled.NoContentText>}
          contentContainerStyle={{ paddingBottom: 105, paddingTop: 24 }}
          data={members}
          estimatedItemSize={Styled.HISTORY_ITEM_HEIGHT}
          onEndReached={fetchNextPage}
          onEndReachedThreshold={0.1}
          refreshControl={
            <RefreshControl
              colors={[theme.palette.primary['500'], theme.palette.neutral['0']]}
              onRefresh={refetchByUser}
              refreshing={isRefetchingByUser}
              tintColor={theme.palette.primary['500']}
            />
          }
          renderItem={({ item }) => <HistoryItem data={item} />}
        />
      </Styled.ListView>
    </>
  );
};

export default History;
