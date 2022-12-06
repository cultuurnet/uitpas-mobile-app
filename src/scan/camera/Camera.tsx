import React, { useCallback, useEffect, useState } from 'react';
import { LayoutChangeEvent, Platform, StatusBar, StyleSheet, View } from 'react-native';
import { runOnJS } from 'react-native-reanimated';
import { Camera as VisionCamera, Frame, useCameraDevices, useFrameProcessor } from 'react-native-vision-camera';
import { useFocusEffect } from '@react-navigation/native';
import { Barcode, BarcodeFormat, scanBarcodes } from 'vision-camera-code-scanner';

import { Spinner } from '../../_components';
import { useStackNavigation } from '../../_hooks';
import { TApiError } from '../../_http';
import { TRootParams } from '../../_routing/_components/RootStackNavigator';
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

const Camera = () => {
  const [isActive, setIsActive] = useState(true);
  const { back: device } = useCameraDevices();
  const { hasCameraPermission } = useCameraPermission();
  const [overlayDimensions, setOverlayDimensions] = useState<[number, number]>([0, 0]);
  const overlay = useOverlayDimensions(overlayDimensions, overlaySettings);
  const { mutateAsync, isLoading } = useCheckin();
  const { navigate, ...navigation } = useStackNavigation<TRootParams>();
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

  useEffect(() => {
    if (Platform.OS === 'android') {
      StatusBar.setTranslucent(true);
      StatusBar.setBackgroundColor(theme.palette.neutral['100']);
    }
    StatusBar.setBarStyle('dark-content');
  }, []);

  useEffect(() => {
    setIsActive(!isLoading);
  }, [isLoading]);

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
        navigate('ScanSuccess', response);
      } catch (error) {
        const { endUserMessage } = error as TApiError;

        // @TODO: error handling
        navigate('Error', {
          message: endUserMessage?.nl,
          onClose: () => navigation.replace('MainNavigator', { screen: 'Camera' } as unknown as undefined), // Types in react-navigation package are incorrect...
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
