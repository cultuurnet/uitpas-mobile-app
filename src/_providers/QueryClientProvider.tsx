import AsyncStorage from '@react-native-async-storage/async-storage';
import { createAsyncStoragePersister } from '@tanstack/query-async-storage-persister';
import { QueryClient } from '@tanstack/react-query';
import { PersistQueryClientProvider } from '@tanstack/react-query-persist-client';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      cacheTime: 1000 * 60 * 60 * 1, // 1 hour
    },
  },
});

const asyncStoragePersister = createAsyncStoragePersister({
  storage: AsyncStorage,
});

const QueryClientProvider = ({ children }) => (
  <PersistQueryClientProvider client={queryClient} persistOptions={{ persister: asyncStoragePersister }}>
    {children}
  </PersistQueryClientProvider>
);

export default QueryClientProvider;
