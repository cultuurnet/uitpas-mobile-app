import { PixelRatio } from 'react-native';
import { Point, Rect } from 'vision-camera-code-scanner';

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

  const isInRange = (barcodeBoundingBox: Rect, cornerPoints: Point[]) => {
    const top = scanRegion.top * pixelRatio * multiplierY;
    const right = scanRegion.right * pixelRatio * multiplierX;
    const bottom = scanRegion.bottom * pixelRatio * multiplierY;
    const left = scanRegion.left * pixelRatio * multiplierX;
    const [topLeft, topRight, bottomRight, bottomLeft] = cornerPoints;

    console.log({
      barcodeBoundingBox,
      cornerPoints: {
        bottomLeft,
        bottomRight,
        topLeft,
        topRight,
      },
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

    if (topLeft.x > left && bottomLeft.x > left) {
      console.log('is inside left');
    }
    if (topRight.x < right && bottomRight.x < right) {
      console.log('is inside right');
    }
    if (topLeft.y > top && topRight.y > top) {
      console.log('is inside top');
    }
    if (bottomLeft.y < bottom && bottomRight.y < bottom) {
      console.log('is inside bottom');
    }
  };

  return { isInRange };
}
