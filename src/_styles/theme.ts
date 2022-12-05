export const theme = {
  // Use hashes
  colors: {
    background: '#eaecec',
    black: '#2E3333',
    blueGreen: '#3eb9bb',
    blurredBlack: 'rgba(0, 0, 0, 0.3)',
    button: '#168b8d',
    blue: '#68C8CA',
    buttonActive: '#0f6163',
    darkGreen: '#0b5641',
    darkRed: '#a32941',
    grey: '#6e7777',
    lightBlue: '#90d9dA',
    lightGreen: '#81d5bE',
    lightGrey: '#cfc3d3',
    lightestGreen: '#bae7e8',
    primary: '#39ac8d',
    primaryDark: '#127173',
    red: '#f82e58',
    redLighter: '#fc97ab',
    secondary: '#149773',
    secondaryDark: '#118363',
    teal: '#1aa5a8',
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
