import React, { useCallback, useState } from 'react';
import { LayoutChangeEvent, StyleSheet, View } from 'react-native';
import {
  Camera as VisionCamera,
  Code,
  CodeScannerFrame,
  runAtTargetFps,
  useCameraDevices,
  useCameraFormat,
  useCodeScanner,
} from 'react-native-vision-camera';
import { useFocusEffect } from '@react-navigation/native';

import { Analytics, FocusAwareStatusBar, Spinner } from '../../_components';
import { useTracking } from '../../_context';
import { TApiError } from '../../_http';
import { TMainNavigationProp } from '../../_routing/_components/TRootStackParamList';
import { theme } from '../../_styles/theme';
import { log, TRACKING_URL_REGEX } from '../../_utils';
import { useHasFamilyMembers } from '../../onboarding/family/_queries';
import { useGetMe } from '../../profile/_queries/useGetMe';
import { useCameraPermission } from '../_hooks';
import { TOverlayDimensions, useOverlayDimensions } from '../_hooks/useOverlayDimensions';
import { useCheckin } from '../_queries/useCheckin';
import { isInRange } from '../_util/isInRange';
import CameraSettings from '../cameraSettings/CameraSettings';
import CameraOverlay from './CameraOverlay';

type TProps = {
  navigation: TMainNavigationProp<'Camera'>;
};

const overlaySettings: TOverlayDimensions = {
  cornerLength: 20,
  padding: 75,
  strokeWidth: 4,
};

const Camera = ({ navigation }: TProps) => {
  const [isActive, setIsActive] = useState(true);
  const { trackSelfDescribingEvent } = useTracking();
  const { data: me } = useGetMe();
  const { hasCameraPermission } = useCameraPermission();
  const [overlayDimensions, setOverlayDimensions] = useState({ height: 0, width: 0 });
  const overlay = useOverlayDimensions(overlayDimensions, overlaySettings);
  const { mutateAsync: checkin, isLoading } = useCheckin();
  const { data: hasFamilyMembers } = useHasFamilyMembers();

  const codeScanner = useCodeScanner({
    codeTypes: ['qr'],
    onCodeScanned: (codes, frame) => {
      runAtTargetFps(5, () => {
        onBarCodeDetected(codes[0], frame);
      });
    },
  });

  const devices = useCameraDevices();
  const device = devices.find(({ position }) => position === 'back');
  const format = useCameraFormat(device, [{ videoResolution: { height: 1080, width: 1920 } }]);

  useFocusEffect(
    useCallback(() => {
      setIsActive(true);
      return () => setIsActive(false);
    }, []),
  );

  function handleLayoutChange({ nativeEvent: { layout } }: LayoutChangeEvent) {
    const { width, height } = layout;
    setOverlayDimensions({ height, width });
  }

  async function onBarCodeDetected(code: Code, frame: CodeScannerFrame) {
    const frameWidth = frame.width > frame.height ? frame.height : frame.width;
    const frameHeight = frame.width > frame.height ? frame.width : frame.height;

    if (isInRange(code, overlay.regionDefinition, [frameWidth, frameHeight])) {
      try {
        setIsActive(false);
        const response = await checkin({
          body: { checkinCode: code.value },
        });
        trackSelfDescribingEvent(
          'successMessage',
          { message: 'points-saved-success' },
          { up_action: { name: 'save-points', points: response.addedPoints, target: 'self', target_ph_id: me?.id } },
        );
        navigation.navigate('ScanSuccess', { ...response, checkinCode: code.value });
      } catch (error) {
        const { endUserMessage } = error as TApiError;
        trackSelfDescribingEvent(
          'errorMessage',
          { message: error.type.replace(TRACKING_URL_REGEX, '') },
          { up_action: { name: 'save-points', points: undefined, target: 'self', target_ph_id: me?.id } },
        );
        navigation.navigate('Error', {
          checkinCode: code.value,
          gotoAfterClose: ['MainNavigator', 'Profile'],
          message: endUserMessage?.nl,
          showFamilyScan: hasFamilyMembers,
        });
        log.error(error);
      }
    }
  }

  if (!hasCameraPermission) {
    return <CameraSettings />;
  }

  if (!device || !format) {
    return <Spinner />;
  }

  return (
    <>
      <Analytics screenName="Camera" />
      <View onLayout={handleLayoutChange} style={StyleSheet.absoluteFill}>
        <FocusAwareStatusBar backgroundColor={theme.palette.neutral['900']} barStyle="light-content" />
        {overlayDimensions.width !== 0 && (
          <VisionCamera codeScanner={codeScanner} device={device} format={format} isActive={isActive} style={overlayDimensions} />
        )}
        <CameraOverlay config={overlay} isLoading={isLoading} settings={overlaySettings} />
      </View>
    </>
  );
};

export default Camera;
