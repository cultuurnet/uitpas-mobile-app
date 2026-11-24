import { useCallback, useRef } from 'react';
import { Platform } from 'react-native';
import * as Brightness from 'expo-brightness';

import { log } from '../_utils/logger';

export const useFullScreenBrightness = () => {
  const initialBrightness = useRef<number | null>(null);

  const brightenScreen = useCallback(async () => {
    try {
      if (Platform.OS === 'ios') {
        initialBrightness.current = await Brightness.getBrightnessAsync();
      }
      await Brightness.setBrightnessAsync(1);
    } catch (error) {
      log.warn('Unable to brighten screen', error);
    }
  }, []);

  const resetScreen = useCallback(async () => {
    try {
      if (Platform.OS === 'android') {
        await Brightness.restoreSystemBrightnessAsync();
        return;
      }
      if (initialBrightness.current !== null) {
        await Brightness.setBrightnessAsync(initialBrightness.current);
        initialBrightness.current = null;
      }
    } catch (error) {
      log.warn('Unable to restore screen brightness', error);
    }
  }, []);

  return { brightenScreen, resetScreen };
};
