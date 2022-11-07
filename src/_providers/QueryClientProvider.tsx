import { useMemo } from 'react';
import { createSyncStoragePersister } from '@tanstack/query-sync-storage-persister';
import { QueryClient } from '@tanstack/react-query';
import { PersistQueryClientProvider } from '@tanstack/react-query-persist-client';

import { useSecureStorage } from '../_hooks/useSecureStorage';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      cacheTime: 1000 * 60 * 60 * 1, // 1 hour
    },
  },
});

const QueryClientProvider = ({ children }) => {
  const { set: setItem, getString: getItem, delete: removeItem } = useSecureStorage();

  const persister = useMemo(
    () =>
      createSyncStoragePersister({
        storage: {
          getItem,
          removeItem,
          setItem,
        },
      }),
    [],
  );

  return (
    <PersistQueryClientProvider client={queryClient} persistOptions={{ persister }}>
      {children}
    </PersistQueryClientProvider>
  );
};

export default QueryClientProvider;
