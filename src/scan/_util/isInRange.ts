import { Point, Rect } from 'vision-camera-code-scanner';

export function isInRange(cornerPoints: Point[], { top, right, bottom, left }: Rect) {
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
}
