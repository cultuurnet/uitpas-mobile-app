import { useEffect, useState } from 'react';
import { PixelRatio } from 'react-native';
import { Rect } from 'vision-camera-code-scanner';

export function useBarcodeRange(
  [videoWidth, videoHeight]: [number, number],
  [screenWidth, screenHeight]: [number, number],
  scanRegion: Rect,
) {
  const pixelRatio = PixelRatio.get();

  const actualScreenWidth = screenWidth * pixelRatio;
  const actualScreenHeight = screenHeight * pixelRatio;

  const multiplierX = videoWidth / actualScreenWidth;
  const multiplierY = videoHeight / actualScreenHeight;

  const isInRange = (barcodeBoundingBox: Rect) => {
    const top = scanRegion.top * multiplierY;
    const right = scanRegion.right * multiplierX;
    const bottom = scanRegion.bottom * multiplierY;
    const left = scanRegion.left * multiplierX;

    console.log({
      barcodeBoundingBox,
      scanRegion: {
        bottom,
        left,
        right,
        top,
      },
      screenHeight: actualScreenWidth,
      screenWidth: actualScreenHeight,
      videoHeight,
      videoWidth,
    }); // @TODO: remove this console.log
  };

  return { isInRange };
}
