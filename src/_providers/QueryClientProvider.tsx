import { createSyncStoragePersister } from '@tanstack/query-sync-storage-persister';
import { QueryClient } from '@tanstack/react-query';
import { PersistQueryClientProvider } from '@tanstack/react-query-persist-client';

import { storage } from '../storage';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      cacheTime: 1000 * 60 * 60 * 1, // 1 hour
    },
  },
});

// if (__DEV__) {
//   import('react-query-native-devtools').then(({ addPlugin }) => {
//     addPlugin({ queryClient });
//   });
// }

const persister = createSyncStoragePersister({
  storage: {
    getItem: (key: string) => storage.getString(key),
    removeItem: (key: string) => storage.delete(key),
    setItem: (key: string, value: string) => storage.set(key, value),
  },
});

const QueryClientProvider = ({ children }) => {
  return (
    <PersistQueryClientProvider client={queryClient} persistOptions={{ persister }}>
      {children}
    </PersistQueryClientProvider>
  );
};

export default QueryClientProvider;
