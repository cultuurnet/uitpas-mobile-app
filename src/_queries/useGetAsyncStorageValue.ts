import AsyncStorage from '@react-native-async-storage/async-storage';
import { useQuery } from '@tanstack/react-query';
import { StorageKey } from '../_models';

async function getAsyncStorageValue<T>(storageKey: StorageKey): Promise<T> {
  const storageValue = await AsyncStorage.getItem(storageKey);
  try {
    return JSON.parse(storageValue) as T;
  } catch (error) {
    return storageValue as any;
  }
}

export function useGetAsyncStorageValue<T>(storageKey: StorageKey) {
  return useQuery<T>(['getAsyncStorageValue', storageKey], () => getAsyncStorageValue<T>(storageKey));
}
