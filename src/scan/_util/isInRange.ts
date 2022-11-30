import { PixelRatio } from 'react-native';
import { Point, Rect } from 'vision-camera-code-scanner';

type TIsInRange = {
  cornerPoints: Point[];
  scanRegion: Rect;
  screenHeight: number;
  screenWidth: number;
  videoHeight: number;
  videoWidth: number;
};

export function isInRange({ cornerPoints, scanRegion, screenHeight, screenWidth, videoHeight, videoWidth }: TIsInRange) {
  const pixelRatio = PixelRatio.get();

  const actualScreenWidth = screenWidth * pixelRatio;
  const actualScreenHeight = screenHeight * pixelRatio;

  const multiplierX = videoWidth / actualScreenWidth;
  const multiplierY = videoHeight / actualScreenHeight;

  const top = scanRegion.top * pixelRatio * multiplierY;
  const right = scanRegion.right * pixelRatio * multiplierX;
  const bottom = scanRegion.bottom * pixelRatio * multiplierY;
  const left = scanRegion.left * pixelRatio * multiplierX;
  const [topLeft, topRight, bottomRight, bottomLeft] = cornerPoints;

  console.log({
    cornerPoints: {
      bottomLeft,
      bottomRight,
      topLeft,
      topRight,
    },
    isInRange: {
      bottom: bottomLeft.y < bottom && bottomRight.y < bottom,
      left: topLeft.x > left && bottomLeft.x > left,
      right: topRight.x < right && bottomRight.x < right,
      top: topLeft.y > top && topRight.y > top,
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

  return (
    topLeft.x > left &&
    bottomLeft.x > left &&
    topRight.x < right &&
    bottomRight.x < right &&
    topLeft.y > top &&
    topRight.y > top &&
    bottomLeft.y < bottom &&
    bottomRight.y < bottom
  );

  return { isInRange };
}
