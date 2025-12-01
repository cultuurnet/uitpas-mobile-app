import { useEffect } from 'react';
import { AppState, AppStateStatus, Platform } from 'react-native';
import { createSyncStoragePersister } from '@tanstack/query-sync-storage-persister';
import { focusManager, QueryClient } from '@tanstack/react-query';
import { PersistQueryClientProvider } from '@tanstack/react-query-persist-client';

import { storage } from '../storage';

function onAppStateChange(status: AppStateStatus) {
  if (Platform.OS !== 'web') {
    focusManager.setFocused(status === 'active');
  }
}

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      gcTime: 1000 * 60 * 60 * 1, // 1 hour
    },
  },
});

const persister = createSyncStoragePersister({
  storage: {
    getItem: (key: string) => storage.getString(key),
    removeItem: (key: string) => storage.delete(key),
    setItem: (key: string, value: string) => storage.set(key, value),
  },
});

const QueryClientProvider = ({ children }) => {
  useEffect(() => {
    const subscription = AppState.addEventListener('change', onAppStateChange);

    return () => subscription.remove();
  }, []);

  return (
    <PersistQueryClientProvider client={queryClient} persistOptions={{ persister }}>
      {children}
    </PersistQueryClientProvider>
  );
};

export default QueryClientProvider;
