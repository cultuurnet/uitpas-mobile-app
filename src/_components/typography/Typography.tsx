import { FC } from 'react';
import { TextProps } from 'react-native';

import { ThemeColor } from '../../_styles/theme';
import * as Styled from './style';

export type TTypographyProps = TextProps & {
  align?: 'left' | 'center' | 'right';
  bottomSpacing?: string;
  children?: React.ReactNode;
  color?: ThemeColor;
  fontStyle?: 'light' | 'normal' | 'semibold' | 'bold';
  size?: 'xxsmall' | 'xsmall' | 'small' | 'normal' | 'large' | 'xlarge' | 'xxlarge' | 'xxxlarge';
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
    <Styled.Typography align={align} color={color} fontStyle={fontStyle} size={size}  {...props} style={[{ includeFontPadding: false, textAlignVertical: 'center' }, props.style]}>
      {children}
    </Styled.Typography>
  );
};

export default Typography;
