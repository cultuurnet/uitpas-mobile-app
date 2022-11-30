import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { LayoutChangeEvent, StatusBar, StyleSheet } from 'react-native';
import { runOnJS } from 'react-native-reanimated';
import { Camera as VisionCamera, sortFormats, useCameraDevices, useFrameProcessor } from 'react-native-vision-camera';
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
  const [videoDimensions, setVideoDimensions] = useState<[number, number]>([0, 0]);

  const format = useMemo(() => device?.formats.sort(sortFormats)[0], [device]);
  useEffect(() => {
    setVideoDimensions([
      format?.videoWidth > format?.videoHeight ? format?.videoHeight : format?.videoWidth,
      format?.videoWidth > format?.videoHeight ? format?.videoWidth : format?.videoHeight,
    ]);
  }, [format]);

  const overlay = useOverlayDimensions(overlayDimensions, videoDimensions, overlaySettings);
  const frameProcessor = useFrameProcessor(
    frame => {
      'worklet';
      const barcodes = scanBarcodes(frame, [BarcodeFormat.QR_CODE]);
      if (barcodes.length > 0) {
        runOnJS(onBarCodeDetected)(barcodes[0]);
      }
    },
    [overlay.actualBoundingBox],
  );

  useFocusEffect(
    useCallback(() => {
      setIsActive(true);
      return () => setIsActive(false);
    }, []),
  );

  useEffect(() => {
    StatusBar.setTranslucent(true);
    return StatusBar.setTranslucent(false);
  }, []);

  function handleLayoutChange({ nativeEvent: { layout } }: LayoutChangeEvent) {
    setOverlayDimensions([layout.width, layout.height]);
  }

  function onBarCodeDetected(barcode: Barcode) {
    if (isInRange(barcode.cornerPoints, overlay.actualBoundingBox)) {
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
        style={StyleSheet.absoluteFill}
      />

      <CameraOverlay config={overlay} settings={overlaySettings} />
    </Styled.CameraWrapper>
  );
};

export default Camera;
