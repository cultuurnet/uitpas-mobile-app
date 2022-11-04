import { FC } from 'react';

import { Theme } from '../../_styles/theme';
import * as Styled from './style';

export type TTypographyProps = {
  align?: 'left' | 'center' | 'right';
  children: React.ReactNode;
  color?: keyof Theme['colors'];
  fontStyle?: 'light' | 'normal' | 'semibold' | 'bold';
  size?: 'small' | 'normal' | 'large' | 'xlarge';
};

const Typography: FC<TTypographyProps> = ({
  children,
  color = 'white',
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
