export const theme = {
  // Use hashes
  colors: {
    background: '#EAECEC',
    blurredBlack: 'rgba(0, 0, 0, 0.3)',
    button: '#168b8d',
    buttonActive: '#0f6163',
    darkGreen: '#0B5641',
    darkRed: '#A32941',
    grey: '#6e7777',
    lightBlue: '#90D9DA',
    lightGreen: '#81D5BE',
    lightGrey: '#CFD3D3',
    primary: '#39ac8d',
    primaryDark: '#127173',
    red: '#F82E58',
    secondary: '#149773',
    secondaryDark: '#118363',
    teal: '#1AA5A8',
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
