import React, { FC, memo, useCallback, useMemo } from 'react';
import { GestureResponderEvent, useWindowDimensions } from 'react-native';
import RenderHtml, { Element, HTMLSource, RenderersProps } from 'react-native-render-html';

import { theme } from '../../_styles/theme';
import { normalizeUrl, openExternalURL } from '../../_utils';
import PressableOpacity from '../pressable/PressableOpacity';
import { getFontFamily } from '../typography/style';

type Props = {
  fontSize?: number;
  onLinkPress?: RenderersProps['a']['onPress'];
  source: HTMLSource;
};

const HtmlRenderer: FC<Props> = ({ source, fontSize = 14, onLinkPress }) => {
  const { width } = useWindowDimensions();

  const onElement = useCallback((element: Element) => {
    if (element.tagName === 'a') {
      element.attribs.href = normalizeUrl(element.attribs.href);
    }
  }, []);

  const handleLinkPress = useCallback(
    (
      event: GestureResponderEvent,
      href: string,
      htmlAttribs: Record<string, string>,
      target: '_blank' | '_self' | '_parent' | '_top',
    ) => {
      onLinkPress?.(event, href, htmlAttribs, target);
      openExternalURL(href);
    },
    [onLinkPress],
  );

  const baseStyle = useMemo(
    () => ({
      color: theme.palette.neutral[900],
      fontFamily: getFontFamily('normal'),
      fontSize,
      lineHeight: 20,
    }),
    [fontSize],
  );

  const defaultTextProps = useMemo(() => ({ selectable: true }), []);

  const domVisitors = useMemo(
    () => ({
      onElement,
    }),
    [onElement],
  );

  const renderersProps = useMemo(() => ({ a: { onPress: handleLinkPress } }), [handleLinkPress]);

  const systemFonts = useMemo(() => [getFontFamily('normal'), getFontFamily('bold')], []);

  const tagsStyles = useMemo(
    () => ({
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
    }),
    [],
  );

  return (
    <RenderHtml
      GenericPressable={PressableOpacity}
      baseStyle={baseStyle}
      contentWidth={width}
      defaultTextProps={defaultTextProps}
      domVisitors={domVisitors}
      pressableHightlightColor="transparent"
      renderersProps={renderersProps}
      source={source}
      systemFonts={systemFonts}
      tagsStyles={tagsStyles}
    />
  );
};

export default memo(HtmlRenderer);
