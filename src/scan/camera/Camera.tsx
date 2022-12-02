import React, { useCallback, useEffect, useState } from 'react';
import { LayoutChangeEvent, Platform, StatusBar } from 'react-native';
import { runOnJS } from 'react-native-reanimated';
import { Camera as VisionCamera, Frame, sortFormats, useCameraDevices, useFrameProcessor } from 'react-native-vision-camera';
import { useFocusEffect } from '@react-navigation/native';
import { Barcode, BarcodeFormat, scanBarcodes } from 'vision-camera-code-scanner';

import { Spinner } from '../../_components';
import { useCameraPermission } from '../_hooks';
import { TOverlayDimensions, useOverlayDimensions } from '../_hooks/useOverlayDimensions';
import { isInRange } from '../_util/isInRange';
import CameraOverlay from './CameraOverlay';
import * as Styled from './style';

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
  const format = device?.formats.sort(sortFormats)[0];
  const overlay = useOverlayDimensions(overlayDimensions, overlaySettings);
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
    if (Platform.OS !== 'android') return;
    StatusBar.setTranslucent(true);
    return StatusBar.setTranslucent(false);
  }, []);

  function handleLayoutChange({ nativeEvent: { layout } }: LayoutChangeEvent) {
    setOverlayDimensions([layout.width, layout.height]);
  }

  function onBarCodeDetected(barcode: Barcode, frame: Frame) {
    const frameWidth = frame.width > frame.height ? frame.height : frame.width;
    const frameHeight = frame.width > frame.height ? frame.width : frame.height;
    if (isInRange(barcode, overlay.regionDefinition, [frameWidth, frameHeight])) {
      setIsActive(false);
    }
  }

  if (!hasCameraPermission || device == null) {
    return <Spinner />;
  }

  return (
    <Styled.CameraWrapper onLayout={handleLayoutChange}>
      <VisionCamera
        device={device}
        format={format}
        frameProcessor={frameProcessor}
        frameProcessorFps={5}
        isActive={isActive}
        style={{ height: overlayDimensions[1], width: overlayDimensions[0] }}
      />

      <CameraOverlay config={overlay} settings={overlaySettings} />
    </Styled.CameraWrapper>
  );
};

export default Camera;
