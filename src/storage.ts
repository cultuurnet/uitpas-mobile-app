import { createMMKV } from 'react-native-mmkv';

import { Config } from './_config';

export const storage = createMMKV({ encryptionKey: Config.REACT_NATIVE_APP_ENCRYPTION_KEY, id: 'UiTPAS-storage' });
