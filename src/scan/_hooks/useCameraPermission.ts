import { useCallback } from 'react';
import { useCameraPermission as useVisionCameraPermission } from 'react-native-vision-camera';
import { useFocusEffect } from '@react-navigation/native';

export function useCameraPermission() {
  const { canRequestPermission, hasPermission, requestPermission } = useVisionCameraPermission();

  useFocusEffect(
    useCallback(() => {
      if (!hasPermission && canRequestPermission) {
        requestPermission();
      }
    }, [canRequestPermission, hasPermission, requestPermission]),
  );

  return {
    hasCameraPermission: hasPermission,
  };
}
