import { Config } from 'react-native-config';
import { MMKV } from 'react-native-mmkv';
import { initializeMMKVFlipper } from 'react-native-mmkv-flipper-plugin';

export const storage = new MMKV({
  encryptionKey: Config.REACT_NATIVE_APP_ENCRYPTION_KEY,
  id: `UiTPAS-storage`,
});

if (__DEV__) {
  initializeMMKVFlipper({ default: storage });
}
