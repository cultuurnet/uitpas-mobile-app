/* eslint-disable sort-keys-fix/sort-keys-fix */

import { ObjectDotNotation } from '../_models';

export const theme = {
  // Use hashes
  palette: {
    neutral: {
      '0': '#ffffff',
      '100': '#EAECEC',
      '200': '#CFD3D3',
      '300': '#A7AFAF',
      '400': '#899494',
      '500': '#6E7777',
      '600': '#525B5B',
      '700': '#474D4D',
      '800': '#3A4040',
      '900': '#2E3333',
      '1000': '#222525',
      '1100': '#161818',
      '1200': '#0A0B0B',
    },
    primary: {
      '0': '#EAFAFB',
      '100': '#D9F2F2',
      '200': '#BAE7E8',
      '300': '#90D9DA',
      '400': '#68C8CA',
      '500': '#3EB9BB',
      '600': '#1AA5A8',
      '700': '#168B8D',
      '800': '#127173',
      '900': '#0E5758',
      '1000': '#0A3D3E',
      '1100': '#062323',
      '1200': '#031112',
    },
    secondary: {
      '0': '#E6FAF4',
      '100': '#D1F0E7',
      '200': '#ABE3D4',
      '300': '#81D5BE',
      '400': '#59C5A7',
      '500': '#39AC8D',
      '600': '#149773',
      '700': '#118363',
      '800': '#0E6C52',
      '900': '#0B5641',
      '1000': '#083F30',
      '1100': '#05291F',
      '1200': '#02120E',
    },
    error: {
      '0': '#FFF0F3',
      '100': '#FEDCE3',
      '200': '#FDBAC7',
      '300': '#FC97AB',
      '400': '#FB748F',
      '500': '#FA5273',
      '600': '#F82E58',
      '700': '#C83250',
      '800': '#A32941',
      '900': '#7E2033',
      '1000': '#5A1624',
      '1100': '#350D15',
      '1200': '#350D15',
    },
  },

  /** @deprecated */
  colors: {
    background: '#eaecec',
    blueGreen: '#3eb9bb',
    blurredBlack: 'rgba(0, 0, 0, 0.3)',
    button: '#168b8d',
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
export type ThemeColor = ObjectDotNotation<Theme['palette']>;
