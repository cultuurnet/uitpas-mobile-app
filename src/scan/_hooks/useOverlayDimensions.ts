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

export function useOverlayDimensions(dimensions, { padding, strokeWidth, cornerLength }: TOverlayDimensions) {
  const [width, height] = dimensions;
  const pixelRatio = PixelRatio.get();

  return useMemo(() => {
    const sideLength = width - padding * 2;
    const boundingBox: Partial<Rect> = {};

    boundingBox.left = (width - sideLength) / 2;
    boundingBox.right = boundingBox.left + sideLength;
    boundingBox.top = (height - sideLength) / 2;
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

    /* @see https://www.dynamsoft.com/barcode-reader/docs/core/parameters/reference/region-definition/index.html?ver=latest#image-process-control */
    const regionDefinition = {
      Bottom: Math.round((boundingBox.bottom / height) * 100),
      Left: Math.round((boundingBox.left / width) * 100),
      Right: Math.round((boundingBox.right / width) * 100),
      Top: Math.round((boundingBox.top / height) * 100),
    };

    return {
      boundingBox: boundingBox as Rect,
      corners,
      regionDefinition,
      sideLength,
    };
  }, [width, height, pixelRatio]);
}
