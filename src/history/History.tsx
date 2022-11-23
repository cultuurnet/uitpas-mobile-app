import { FC } from 'react';
import { FlashList } from '@shopify/flash-list';

import { SafeAreaView } from '../_components';
import { useGetHistory } from './_queries/useGetHistory';
import HistoryItem from './HistoryItem';

const History: FC = () => {
  const { data } = useGetHistory();

  return (
    <SafeAreaView>
      <FlashList data={data.pages?.flat()} renderItem={({ item }) => <HistoryItem data={item} />} />
    </SafeAreaView>
  );
};

export default History;
