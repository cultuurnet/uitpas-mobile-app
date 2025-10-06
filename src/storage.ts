import { Config } from './_config';
import { MMKV } from 'react-native-mmkv';

export const storage = new MMKV({ encryptionKey: Config.REACT_NATIVE_APP_ENCRYPTION_KEY, id: `UiTPAS-storage` });
