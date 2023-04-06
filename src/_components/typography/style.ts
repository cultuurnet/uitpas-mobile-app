import styled from 'styled-components/native';

import { getColor } from '../../_utils/colorHelper';
import { TTypographyProps } from './Typography';

export const Typography = styled.Text<TTypographyProps>`
  color: ${({ color }) => getColor(color)};
  text-align: ${({ align }) => align};
  margin-bottom: ${({ bottomSpacing }) => (bottomSpacing ? bottomSpacing : '0px')};
  margin-top: ${({ topSpacing }) => (topSpacing ? topSpacing : '0px')};
  include-font-padding: false;
  text-align-vertical: center;
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

  line-height: ${({ size }) => {
    switch (size) {
      case 'xxsmall':
        return '10px';
      case 'xsmall':
        return '15px';
      case 'small':
        return '20px';
      case 'normal':
        return '24px';
      case 'large':
        return '27px';
      case 'xlarge':
        return '30px';
      case 'xxlarge':
        return '36px';
      case 'xxxlarge':
        return '40px';
    }
  }};

  font-size: ${({ size }) => {
    switch (size) {
      case 'xxsmall':
        return '8px';

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

      case 'xxlarge':
        return '24px';

      case 'xxxlarge':
        return '28px';
    }
  }};
`;
