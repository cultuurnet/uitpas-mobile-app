import { StorageKey } from '../_models';
import { storage } from '../storage';

export const getLanguage = () => {
  const lang = storage.getString(StorageKey.Language);
  return lang || 'nl';
};
