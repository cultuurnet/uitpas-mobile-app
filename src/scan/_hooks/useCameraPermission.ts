import { useCallback, useState } from 'react';
import { Camera } from 'react-native-vision-camera';
import { useFocusEffect } from '@react-navigation/native';

export function useCameraPermission() {
  const [hasCameraPermission, setHasCameraPermission] = useState<boolean>();

  useFocusEffect(
    useCallback(() => {
      (async () => {
        let permission = await Camera.getCameraPermissionStatus();
        if (permission !== 'authorized') {
          permission = await Camera.requestCameraPermission();
        }

        setHasCameraPermission(permission === 'authorized');
      })();
    }, []),
  );

  return {
    hasCameraPermission,
  };
}
