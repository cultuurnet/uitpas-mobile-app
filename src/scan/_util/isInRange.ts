import { Barcode, Rect } from 'vision-camera-code-scanner';

type Dimensions = [width: number, height: number];

export function isInRange({ boundingBox }: Barcode, scanRegion: Rect, [frameWidth, frameHeight]: Dimensions) {
  if (boundingBox) {
    /** bounding box for QR code in percentages */
    const qrBoundingBox: Rect = {
      bottom: boundingBox.bottom / frameHeight,
      left: boundingBox.left / frameWidth,
      right: boundingBox.right / frameWidth,
      top: boundingBox.top / frameHeight,
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
