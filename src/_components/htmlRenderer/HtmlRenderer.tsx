import React, { FC } from 'react';
import { TouchableOpacity, useWindowDimensions } from 'react-native';
import RenderHtml, { Element, HTMLSource } from 'react-native-render-html';

import { theme } from '../../_styles/theme';
import { normalizeUrl } from '../../_utils/normalizeHelpers';
import { getFontFamily } from '../typography/style';

type Props = {
  fontSize?: number;
  source: HTMLSource;
};

const HtmlRenderer: FC<Props> = ({ source, fontSize = 14 }) => {
  const { width } = useWindowDimensions();

  function onElement(element: Element) {
    if (element.tagName === 'a') {
      element.attribs['href'] = normalizeUrl(element.attribs['href']);
    }
  }

  return (
    <RenderHtml
      GenericPressable={TouchableOpacity}
      baseStyle={{
        color: theme.palette.neutral[900],
        fontFamily: getFontFamily('normal'),
        fontSize,
        lineHeight: 20,
      }}
      contentWidth={width}
      defaultTextProps={{ selectable: true }}
      domVisitors={{
        onElement,
      }}
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
