export type TFontWeight = 'bold' | 'light' | 'normal' | 'semiBold';
export type TFontSize = 'small' | 'normal' | 'large';
export type TTextAlign = 'center' | 'left' | 'right';

export type TFont = {
  fontFamily: string;
  fontSize: number;
  lineHeight: number;
  textAlign: TTextAlign;
};

export function getFontFamily(weight: TFontWeight): string {
  switch (weight) {
    case 'bold':
      return 'HKNova-BoldR';
    case 'semiBold':
      return 'HKNova-SemiBoldR';
    case 'light':
      return 'HKNova-LightR';
    default:
      return 'HKNova-RegularR';
  }
}

export function getFontSize(size: TFontSize): number {
  switch (size) {
    case 'small':
      return 14;
    case 'large':
      return 18;
    default:
      return 16;
  }
}

export function getFont(size?: TFontSize | number, weight?: TFontWeight, textAlign?: TTextAlign): TFont {
  const fontSize = typeof size === 'number' ? size : getFontSize(size || 'normal');
  return {
    fontFamily: getFontFamily(weight || 'normal'),
    fontSize,
    lineHeight: fontSize * 1.2,
    textAlign: textAlign || 'left',
  };
}
