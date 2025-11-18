import React, { FC } from 'react';
import { GestureResponderEvent, useWindowDimensions } from 'react-native';
import RenderHtml, { Element, HTMLSource, RenderersProps } from 'react-native-render-html';

import PressableOpacity from '../pressable/PressableOpacity';

import { theme } from '../../_styles/theme';
import { normalizeUrl, openExternalURL } from '../../_utils';
import { getFontFamily } from '../typography/style';

type Props = {
  fontSize?: number;
  onLinkPress?: RenderersProps['a']['onPress'];
  source: HTMLSource;
};

const HtmlRenderer: FC<Props> = ({ source, fontSize = 14, onLinkPress }) => {
  const { width } = useWindowDimensions();
  function onElement(element: Element) {
    if (element.tagName === 'a') {
      element.attribs.href = normalizeUrl(element.attribs.href);
    }
  }

  function handleLinkPress(
    event: GestureResponderEvent,
    href: string,
    htmlAttribs: Record<string, string>,
    target: '_blank' | '_self' | '_parent' | '_top',
  ) {
    onLinkPress?.(event, href, htmlAttribs, target);
    openExternalURL(href);
  }

  return (
    <RenderHtml
      GenericPressable={PressableOpacity}
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
      renderersProps={{ a: { onPress: handleLinkPress } }}
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
