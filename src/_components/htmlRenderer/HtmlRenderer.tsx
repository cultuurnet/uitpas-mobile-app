import React, { FC } from 'react';
import { TouchableOpacity, useWindowDimensions } from 'react-native';
import RenderHtml, { HTMLSource } from 'react-native-render-html';

import { theme } from '../../_styles/theme';
import { getFontFamily } from '../typography/style';


type Props = {
  source: HTMLSource;
};

const HtmlRenderer: FC<Props> = ({ source }) => {
  const { width } = useWindowDimensions();

  return (
    <RenderHtml
      GenericPressable={TouchableOpacity}
      baseStyle={{
        color: theme.palette.neutral[900],
        fontFamily: getFontFamily('normal'),
        fontSize: 14,
        lineHeight: 20,
      }}
      contentWidth={width}
      pressableHightlightColor="transparent"
      source={source}
      systemFonts={[getFontFamily('normal'), getFontFamily('bold')]}
      tagsStyles={{
        a: {
          color: theme.palette.primary[800],
          textDecorationColor: theme.palette.primary[800],
        },
        b: {
          fontFamily: getFontFamily('bold'),
        },
        bold: {
          fontFamily: getFontFamily('bold'),
        },
        strong: {
          fontFamily: getFontFamily('bold'),
        },
      }}
    />
  );
};

export default HtmlRenderer;