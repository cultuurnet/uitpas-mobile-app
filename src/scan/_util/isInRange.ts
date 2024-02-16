import { Code } from 'react-native-vision-camera';

type Rect = {
  bottom: number;
  left: number;
  right: number;
  top: number;
};

type Dimensions = [width: number, height: number];

export function isInRange({ corners }: Code, scanRegion: Rect, [frameWidth, frameHeight]: Dimensions) {
  const [topLeft, topRight, bottomRight, bottomLeft] = corners;

  if (corners && corners.length >= 4) {
    /** bounding box for QR code in percentages */
    const qrBoundingBox: Rect = {
      bottom: (bottomLeft.y + bottomRight.y) / 2 / frameHeight,
      left: (topLeft.x + bottomLeft.x) / 2 / frameWidth,
      right: (topRight.x + bottomRight.x) / 2 / frameWidth,
      top: (topLeft.y + topRight.y) / 2 / frameHeight,
    };

    return (
      qrBoundingBox.left > scanRegion.left &&
      qrBoundingBox.right < scanRegion.right &&
      qrBoundingBox.top > scanRegion.top &&
      qrBoundingBox.bottom < scanRegion.bottom
    );
  }

  return false;
}
