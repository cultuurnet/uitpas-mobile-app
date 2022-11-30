import React, { useCallback, useEffect, useState } from 'react';
import { LayoutChangeEvent, Platform, StatusBar, StyleSheet, View } from 'react-native';
import { runOnJS } from 'react-native-reanimated';
import { Camera as VisionCamera, useCameraDevices, useFrameProcessor } from 'react-native-vision-camera';
import { useFocusEffect } from '@react-navigation/native';
import { decode, TextResult } from 'vision-camera-dynamsoft-barcode-reader';

import { useStackNavigation } from '../../_hooks';
import { HttpStatus, TApiError } from '../../_http';
import { TRootParams } from '../../_routing/_components/RootStackNavigator';
import { theme } from '../../_styles/theme';
import { log } from '../../_utils/logger';
import { useCameraPermission } from '../_hooks';
import { TOverlayDimensions, useOverlayDimensions } from '../_hooks/useOverlayDimensions';
import { useCheckin } from '../_queries/useCheckin';
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
  const { mutateAsync, isLoading } = useCheckin();
  const { navigate } = useStackNavigation<TRootParams>();

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
    if (Platform.OS === 'android') StatusBar.setBackgroundColor(theme.colors.background);
    StatusBar.setBarStyle('dark-content');
    StatusBar.setTranslucent(true);
  }, []);

  useEffect(() => {
    setIsActive(!isLoading);
  }, [isLoading]);

  function handleLayoutChange({ nativeEvent: { layout } }: LayoutChangeEvent) {
    setDimensions([layout.width, layout.height]);
  }

  async function onBarCodeDetected({ barcodeText }: TextResult) {
    try {
      const response = await mutateAsync({ checkinCode: barcodeText });
      navigate('ScanSuccess', response);
    } catch (error) {
      const { status, endUserMessage } = error as TApiError;
      if (
        status === HttpStatus.BadRequest ||
        status === HttpStatus.Unauthorized ||
        status === HttpStatus.Forbidden ||
        status === HttpStatus.TooManyRequests
      ) {
        navigate('ScanError', {
          error: endUserMessage.nl,
        });
      }

      // @TODO: error handling
      log.error(error);
    }
  }

  if (!hasCameraPermission || devices.back == null) {
    return <></>;
  }

  return (
    <View onLayout={handleLayoutChange} style={StyleSheet.absoluteFill}>
      <VisionCamera
        device={devices.back}
        frameProcessor={frameProcessor}
        frameProcessorFps={5}
        isActive={isActive}
        style={StyleSheet.absoluteFill}
      />

      <CameraOverlay config={overlay} isLoading={isLoading} settings={overlaySettings} />
    </View>
  );
};

export default Camera;
