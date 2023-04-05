import React, { useCallback, useState } from 'react';
import { LayoutChangeEvent, StyleSheet, View } from 'react-native';
import { runOnJS } from 'react-native-reanimated';
import { Camera as VisionCamera, Frame, useCameraDevices, useFrameProcessor } from 'react-native-vision-camera';
import { useFocusEffect } from '@react-navigation/native';
import { Barcode, BarcodeFormat, scanBarcodes } from 'vision-camera-code-scanner';

import { FocusAwareStatusBar, Spinner } from '../../_components';
import { TApiError } from '../../_http';
import { TMainNavigationProp } from '../../_routing/_components/TRootStackParamList';
import { theme } from '../../_styles/theme';
import { log } from '../../_utils/logger';
import { useCameraPermission } from '../_hooks';
import { TOverlayDimensions, useOverlayDimensions } from '../_hooks/useOverlayDimensions';
import { useCheckin } from '../_queries/useCheckin';
import { isInRange } from '../_util/isInRange';
import CameraSettings from '../cameraSettings/CameraSettings';
import CameraOverlay from './CameraOverlay';

const overlaySettings: TOverlayDimensions = {
  cornerLength: 20,
  padding: 75,
  strokeWidth: 4,
};

type TProps = {
  navigation: TMainNavigationProp<'Camera'>;
}

const Camera = ({ navigation }: TProps) => {
  const [isActive, setIsActive] = useState(true);
  const { back: device } = useCameraDevices();
  const { hasCameraPermission } = useCameraPermission();
  const [overlayDimensions, setOverlayDimensions] = useState<[number, number]>([0, 0]);
  const overlay = useOverlayDimensions(overlayDimensions, overlaySettings);
  const { mutateAsync, isLoading } = useCheckin();
  const frameProcessor = useFrameProcessor(
    frame => {
      'worklet';
      const barcodes = scanBarcodes(frame, [BarcodeFormat.QR_CODE]);
      if (barcodes.length > 0) {
        runOnJS(onBarCodeDetected)(barcodes[0], frame);
      }
    },
    [overlayDimensions],
  );

  useFocusEffect(
    useCallback(() => {
      setIsActive(true);
      return () => setIsActive(false);
    }, []),
  );

  function handleLayoutChange({ nativeEvent: { layout } }: LayoutChangeEvent) {
    setOverlayDimensions([layout.width, layout.height]);
  }

  async function onBarCodeDetected(barcode: Barcode, frame: Frame) {
    const frameWidth = frame.width > frame.height ? frame.height : frame.width;
    const frameHeight = frame.width > frame.height ? frame.width : frame.height;

    if (isInRange(barcode, overlay.regionDefinition, [frameWidth, frameHeight])) {
      try {
        setIsActive(false);
        const response = await mutateAsync({ checkinCode: barcode.displayValue });
        navigation.navigate('ScanSuccess', response);
      } catch (error) {
        const { endUserMessage } = error as TApiError;

        navigation.navigate('Error', {
          gotoAfterClose: ['MainNavigator', 'Profile'],
          message: endUserMessage?.nl,
        });
        log.error(error);
      }
    }
  }

  if (!hasCameraPermission) {
    return <CameraSettings />;
  }

  if (!hasCameraPermission || device == null) {
    return <Spinner />;
  }

  return (
    <View onLayout={handleLayoutChange} style={StyleSheet.absoluteFill}>
      <FocusAwareStatusBar backgroundColor={theme.palette.neutral['900']} barStyle="light-content" translucent />
      <VisionCamera
        device={device}
        frameProcessor={frameProcessor}
        frameProcessorFps={5}
        isActive={isActive}
        style={{ height: overlayDimensions[1], width: overlayDimensions[0] }}
      />

      <CameraOverlay config={overlay} isLoading={isLoading} settings={overlaySettings} />
    </View>
  );
};

export default Camera;
