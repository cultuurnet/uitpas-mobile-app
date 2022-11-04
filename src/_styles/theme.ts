export const theme = {
  // Use hashes
  colors: {
    button: '#168b8d',
    buttonActive: '#0f6163',
    grey: '#6e7777',
    primary: '#39ac8d',
    secondary: '#149773',
    secondaryDark: '#118363',
    text: '#2d3843',
    white: '#ffffff',
  },

  common: {
    borderRadius: 6,
    defaultSpacing: 16,
    spacingVertical: 14,
  },
} as const;

export type Theme = typeof theme;
