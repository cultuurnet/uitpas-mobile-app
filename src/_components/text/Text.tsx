import React, { FC } from 'react';
import { Text as RNText, TextProps } from 'react-native';

import { colors, getFont, TFontSize, TFontWeight, TTextAlign } from '../../_styles';

type TProps = TextProps & {
  align?: TTextAlign;
  color?: keyof typeof colors;
  size?: TFontSize | number;
  weight?: TFontWeight;
};

export const Text: FC<TProps> = ({
  align = 'left',
  children,
  color = 'black',
  size = 'normal',
  style = {},
  weight = 'normal',
  ...props
}) => {
  return (
    <RNText
      {...props}
      style={[
        {
          color: colors[color],
          ...getFont(size, weight, align),
        },
        style,
      ]}
    >
      {children}
    </RNText>
  );
};
