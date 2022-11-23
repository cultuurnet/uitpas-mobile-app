import { useEffect, useState } from 'react';
import { Camera } from 'react-native-vision-camera';

export function useCameraPermission() {
  const [hasCameraPermission, setHasCameraPermission] = useState<boolean>();

  useEffect(() => {
    (async () => {
      let permission = await Camera.getCameraPermissionStatus();
      if (permission !== 'authorized') {
        permission = await Camera.requestCameraPermission();
      }

      setHasCameraPermission(permission === 'authorized');
    })();
  }, []);

  return {
    hasCameraPermission,
  };
}
