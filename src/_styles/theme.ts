export const theme = {
  // Use hashes
  colors: {
    background: '#eaecec',
    blurredBlack: 'rgba(0, 0, 0, 0.3)',
    grey: '#6e7777',
    lightGreen: '#90D9DA',
    primary: '#39ac8d',
    primaryDark: '#127173',
    secondary: '#149773',
    secondaryDark: '#118363',
    text: '#2d3843',
    turquoise: '#168b8d',
    turquoiseActive: '#168b8d',
    white: '#ffffff',
  },

  common: {
    borderRadius: 6,
    defaultSpacing: 16,
    spacingVertical: 14,
  },
} as const;

export type Theme = typeof theme;
