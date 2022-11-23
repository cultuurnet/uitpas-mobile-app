import React, { useCallback, useEffect, useState } from 'react';
import { LayoutChangeEvent, StatusBar, StyleSheet } from 'react-native';
import { runOnJS } from 'react-native-reanimated';
import { Camera as VisionCamera, useCameraDevices, useFrameProcessor } from 'react-native-vision-camera';
import { useFocusEffect } from '@react-navigation/native';
import { decode, TextResult } from 'vision-camera-dynamsoft-barcode-reader';

import { useCameraPermission } from '../_hooks';
import { TOverlayDimensions, useOverlayDimensions } from '../_hooks/useOverlayDimensions';
import CameraOverlay from './CameraOverlay';
import * as Styled from './style';

const overlaySettings: TOverlayDimensions = {
  cornerLength: 20,
  padding: 75,
  strokeWidth: 4,
};

const Camera = () => {
  const [isActive, setIsActive] = useState(true);
  const devices = useCameraDevices();
  const { hasCameraPermission } = useCameraPermission();
  const [dimensions, setDimensions] = useState<[number, number]>([0, 0]);

  const overlay = useOverlayDimensions(dimensions, overlaySettings);
  const frameProcessor = useFrameProcessor(
    frame => {
      'worklet';

      const barcodes: TextResult[] = decode(frame, {
        template: JSON.stringify({
          ImageParameter: {
            BarcodeFormatIds: ['BF_QR_CODE'],
            Description: '',
            Name: 'Settings',
            RegionDefinitionNameArray: ['Square'],
          },
          RegionDefinition: {
            MeasuredByPercentage: 1,
            Name: 'Square',
            ...overlay.regionDefinition,
          },
          Version: '3.0',
        }),
      });

      if (barcodes.length > 0) {
        runOnJS(onBarCodeDetected)(barcodes[0]);
      }
    },
    [overlay.regionDefinition],
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
    setDimensions([layout.width, layout.height]);
  }

  function onBarCodeDetected(barcode: TextResult) {
    console.log({ barcode }); // @TODO: remove this console.log
    setIsActive(false);
  }

  if (!hasCameraPermission || devices.back == null) {
    return <></>;
  }

  return (
    <Styled.CameraWrapper onLayout={handleLayoutChange}>
      <VisionCamera
        device={devices.back}
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
