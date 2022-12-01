import { useMemo } from 'react';
import { PixelRatio } from 'react-native';
import { Rect } from 'vision-camera-code-scanner';

type Corner = {
  path: string;
  x: number;
  y: number;
};

export type TOverlayDimensions = {
  cornerLength: number;
  padding: number;
  strokeWidth: number;
};

export function useOverlayDimensions(
  screenDimensions,
  videoDimensions,
  { padding, strokeWidth, cornerLength }: TOverlayDimensions,
) {
  const [screenWidth, screenHeight] = screenDimensions;
  const [videoWidth, videoHeight] = videoDimensions;
  const pixelRatio = PixelRatio.get();

  return useMemo(() => {
    const sideLength = screenWidth - padding * 2;
    const boundingBox: Partial<Rect> = {};

    boundingBox.left = (screenWidth - sideLength) / 2;
    boundingBox.right = boundingBox.left + sideLength;
    boundingBox.top = (screenHeight - sideLength) / 2;
    boundingBox.bottom = boundingBox.top + sideLength;

    const corners: Corner[] = [
      {
        path: `M 0 ${cornerLength} L 0 0 L ${cornerLength} 0`,
        x: boundingBox.left + strokeWidth / 2,
        y: boundingBox.top + strokeWidth / 2,
      },
      {
        path: `M 0 0 L ${cornerLength} 0 L ${cornerLength} ${cornerLength}`,
        x: boundingBox.right - cornerLength - strokeWidth / 2,
        y: boundingBox.top + strokeWidth / 2,
      },
      {
        path: `M ${cornerLength} 0 L ${cornerLength} ${cornerLength} L 0 ${cornerLength}`,
        x: boundingBox.right - cornerLength - strokeWidth / 2,
        y: boundingBox.bottom - cornerLength - strokeWidth / 2,
      },
      {
        path: `M 0 0 L 0 ${cornerLength} L ${cornerLength} ${cornerLength}`,
        x: boundingBox.left + strokeWidth / 2,
        y: boundingBox.bottom - cornerLength - strokeWidth / 2,
      },
    ];

    const actualScreenWidth = screenWidth * pixelRatio;
    const actualScreenHeight = screenHeight * pixelRatio;

    const filledVideoWidth = (videoHeight * screenWidth) / screenHeight;
    const clippedVideoSectionsWidth = Math.abs(filledVideoWidth - videoWidth);

    const multiplierX = videoWidth / actualScreenWidth;
    const multiplierY = videoHeight / actualScreenHeight;

    const actualBoundingBox = {
      bottom: (boundingBox.bottom + padding / 2) * pixelRatio * multiplierY,
      left: (boundingBox.left + clippedVideoSectionsWidth) * pixelRatio * multiplierX,
      right: (boundingBox.right + clippedVideoSectionsWidth + padding / 2) * pixelRatio * multiplierX,
      top: boundingBox.top * pixelRatio * multiplierY,
    };

    return {
      actualBoundingBox,
      boundingBox: boundingBox as Rect,
      corners,
      sideLength,
    };
  }, [screenWidth, screenHeight, pixelRatio, videoDimensions, screenDimensions]);
}
