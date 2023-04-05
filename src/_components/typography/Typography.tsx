import { FC } from 'react';

import { ThemeColor } from '../../_styles/theme';
import * as Styled from './style';

export type TTypographyProps = {
  align?: 'left' | 'center' | 'right';
  bottomSpacing?: string;
  children?: React.ReactNode;
  color?: ThemeColor;
  fontStyle?: 'light' | 'normal' | 'semibold' | 'bold';
  size?: 'xsmall' | 'small' | 'normal' | 'large' | 'xlarge' | 'xxlarge' | 'xxxlarge';
  topSpacing?: string;
};

const Typography: FC<TTypographyProps> = ({
  children,
  color = 'neutral.900',
  size = 'normal',
  align = 'left',
  fontStyle = 'normal',
  ...props
}) => {
  return (
    <Styled.Typography align={align} color={color} fontStyle={fontStyle} size={size} {...props}>
      {children}
    </Styled.Typography>
  );
};

export default Typography;
