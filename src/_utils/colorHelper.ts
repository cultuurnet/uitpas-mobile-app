import { theme, ThemeColor } from '../_styles/theme';

export function getColor(input: ThemeColor) {
  const [color, tint] = input.split('.');
  if (!color || !tint) {
    throw new Error(`Invalid color '${input}' provided for `);
  }
  return theme.palette[color][tint];
}
