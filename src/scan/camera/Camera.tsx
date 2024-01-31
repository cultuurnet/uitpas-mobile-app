import React, { useCallback, useEffect, useState } from 'react';
import { LayoutChangeEvent, StyleSheet, View } from 'react-native';
import {
  Camera as VisionCamera,
  runAtTargetFps,
  useCameraDevices,
  useCameraFormat,
  useCodeScanner,
} from 'react-native-vision-camera';
import { CameraHighlights, useBarcodeScanner } from '@mgcrea/vision-camera-barcode-scanner';
import { useFocusEffect } from '@react-navigation/native';

import { Analytics, FocusAwareStatusBar, Spinner } from '../../_components';
import { useTracking } from '../../_context';
import { TMainNavigationProp } from '../../_routing/_components/TRootStackParamList';
import { theme } from '../../_styles/theme';
import { useHasFamilyMembers } from '../../onboarding/family/_queries';
import { useGetMe } from '../../profile/_queries/useGetMe';
import { useCameraPermission } from '../_hooks';
import { useCheckin } from '../_queries/useCheckin';
import CameraSettings from '../cameraSettings/CameraSettings';
import { NewCameraOverlay } from './NewCameraOverlay';

type TProps = {
  navigation: TMainNavigationProp<'Camera'>;
};

const Camera = ({ navigation }: TProps) => {
  const [isActive, setIsActive] = useState(true);
  const { data: me } = useGetMe();
  const { hasCameraPermission } = useCameraPermission();
  // const [overlayDimensions, setOverlayDimensions] = useState({ height: 0, width: 0 });
  // const overlay = useOverlayDimensions(overlayDimensions, overlaySettings);
  const { mutateAsync: checkin, isLoading } = useCheckin();
  const { data: hasFamilyMembers } = useHasFamilyMembers();

  useEffect(() => {
    const runEffect = async () => {
      setTimeout(() => {
        setIsActive(true);
      }, 1000);
    };
    runEffect();
  }, []);

  const codeScanner = useCodeScanner({
    regionOfInterest
    codeTypes: ['qr'],
    onCodeScanned: scannedCodes => {
      runAtTargetFps(5, () => {
        // console.log(`Scanned ${scannedCodes.length} codes!`);
        // setCodes((codes: Code[]) => [...codes, ...scannedCodes]);
        console.log(JSON.stringify(scannedCodes, null, 2));
      });
    },
  });

  const devices = useCameraDevices();
  const device = devices.find(({ position }) => position === 'back');
  const format = useCameraFormat(device, [{ videoResolution: { height: 1080, width: 1920 } }]);
  // function handleLayoutChange({ nativeEvent: { layout } }: LayoutChangeEvent) {
  //   const { width, height } = layout;
  //   // setOverlayDimensions({ height, width });
  // }

  if (!hasCameraPermission) {
    return <CameraSettings />;
  }
  console.log('device', device);
  console.log('format', format);
  if (!device || !format) {
    return <Spinner />;
  }

  return (
    <>
      <Analytics screenName="Camera" />
      <View style={StyleSheet.absoluteFill}>
        <FocusAwareStatusBar backgroundColor={theme.palette.neutral['900']} barStyle="light-content" />
        <VisionCamera codeScanner={codeScanner} device={device} isActive={isActive} style={StyleSheet.absoluteFill} />
        <NewCameraOverlay />
      </View>
    </>
  );
};

export default Camera;

// async function onBarCodeDetected(barcode: Barcode, frame: Frame) {
//   const frameWidth = frame.width > frame.height ? frame.height : frame.width;
//   const frameHeight = frame.width > frame.height ? frame.width : frame.height;

//   if (isInRange(barcode, overlay.regionDefinition, [frameWidth, frameHeight])) {
//     try {
//       setIsActive(false);
//       const response = await checkin({
//         body: { checkinCode: barcode.displayValue },
//       });
//       trackSelfDescribingEvent(
//         'successMessage',
//         { message: 'points-saved-success' },
//         { up_action: { name: 'save-points', points: response.addedPoints, target: 'self', target_ph_id: me?.id } },
//       );
//       navigation.navigate('ScanSuccess', { ...response, checkinCode: barcode.displayValue });
//     } catch (error) {
//       const { endUserMessage } = error as TApiError;
//       trackSelfDescribingEvent(
//         'errorMessage',
//         { message: error.type.replace(TRACKING_URL_REGEX, '') },
//         { up_action: { name: 'save-points', points: undefined, target: 'self', target_ph_id: me?.id } },
//       );
//       navigation.navigate('Error', {
//         checkinCode: barcode.displayValue,
//         gotoAfterClose: ['MainNavigator', 'Profile'],
//         message: endUserMessage?.nl,
//         showFamilyScan: hasFamilyMembers,
//       });
//       log.error(error);
//     }
//   }
// }
