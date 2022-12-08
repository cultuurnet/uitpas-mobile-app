import { useMemo } from 'react';
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
  screenDimensions: [number, number],
  { padding, strokeWidth, cornerLength }: TOverlayDimensions,
) {
  const [screenWidth, screenHeight] = screenDimensions;

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

    const regionDefinition = {
      bottom: boundingBox.bottom / screenHeight,
      left: boundingBox.left / screenWidth,
      right: boundingBox.right / screenWidth,
      top: boundingBox.top / screenHeight,
    };

    return {
      boundingBox: boundingBox as Rect,
      corners,
      regionDefinition,
      sideLength,
    };
  }, [screenWidth, screenHeight, screenDimensions]);
}
