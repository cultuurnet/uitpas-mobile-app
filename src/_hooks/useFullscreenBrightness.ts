import { useEffect, useRef } from 'react';
import { Platform } from 'react-native';
import DeviceBrightness from '@adrianso/react-native-device-brightness';

export const useFullScreenBrightness = () => {
  const initialBrightness = useRef(-1);

  useEffect(() => {
    const brightenScreen = async () => {
      initialBrightness.current =
        Platform.OS === 'android'
          ? await DeviceBrightness.getSystemBrightnessLevel()
          : await DeviceBrightness.getBrightnessLevel();

      DeviceBrightness.setBrightnessLevel(1);
    };

    brightenScreen();

    return () => {
      if (initialBrightness.current !== -1) {
        DeviceBrightness.setBrightnessLevel(initialBrightness.current);
      }
    };
  }, []);
};
