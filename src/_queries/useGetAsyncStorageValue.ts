import AsyncStorage from '@react-native-async-storage/async-storage';
import { useQuery } from '@tanstack/react-query';

import { StorageKey } from '../_models';

async function getAsyncStorageValue<T>(storageKey: StorageKey) {
  const storageValue = await AsyncStorage.getItem(storageKey);
  try {
    return JSON.parse(storageValue) as T;
  } catch (error) {
    //TODO: add error logging
    return undefined;
  }
}

export function useGetAsyncStorageValue<T>(storageKey: StorageKey) {
  return useQuery<T>(['getAsyncStorageValue', storageKey], () => getAsyncStorageValue<T>(storageKey));
}
