import styled from 'styled-components/native';

import { TTypographyProps } from './Typography';

export const Typography = styled.Text<TTypographyProps>`
  color: ${({ color, theme }) => theme.colors[color]};
  text-align: ${({ align }) => align}

  font-family: ${({ fontStyle }) => {
    switch (fontStyle) {
      case 'light':
        return 'Poppins-Light';

      case 'normal':
        return 'Poppins-Regular';

      case 'semibold':
        return 'Poppins-SemiBold';

      case 'bold':
        return 'Poppins-Bold';
    }
  }};

  font-size: ${({ size }) => {
    switch (size) {
      case 'xsmall':
        return '10px';

      case 'small':
        return '14px';

      case 'normal':
        return '16px';

      case 'large':
        return '18px';

      case 'xlarge':
        return '20px';

      case 'verylarge':
        return '24px';
    }
  }};
`;
