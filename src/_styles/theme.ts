export const theme = {
  // Use hashes
  colors: {
    grey: '#6e7777',
    primary: '#39ac8d',
    text: '#2d3843',
  },

  common: {
    borderRadius: 6,
    defaultSpacing: 16,
    spacingVertical: 14,
  },
} as const;

export type Theme = typeof theme;
