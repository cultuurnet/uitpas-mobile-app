import React, { FC, Fragment, memo, ReactNode, useCallback } from 'react';
import { View } from 'react-native';
import type { ChildNode, Element, Text as DOMText } from 'domhandler';
import { parseDocument } from 'htmlparser2';

import { normalizeUrl, openExternalURL } from '../../_utils';
import InlineLink from '../inlineLink/InlineLink';
import type { TTypographyProps } from '../typography/Typography';
import Typography from '../typography/Typography';

type Props = {
  fontSize?: TTypographyProps['size'];
  onLinkPress?: (url: string) => void;
  source: { html: string };
};

type StyleContext = {
  bold?: boolean;
  fontSize?: TTypographyProps['size'];
  italic?: boolean;
  listIndex?: number;
  listType?: 'ordered' | 'unordered';
  underline?: boolean;
};

const HtmlRenderer: FC<Props> = ({ source, fontSize = 'small', onLinkPress }) => {
  const handleLinkPress = useCallback(
    (href: string) => {
      const normalizedUrl = normalizeUrl(href);
      onLinkPress?.(normalizedUrl);
      openExternalURL(normalizedUrl);
    },
    [onLinkPress],
  );

  const getTypographyProps = useCallback((context: StyleContext): Partial<Omit<TTypographyProps, 'onPress'>> => {
    const props: Partial<TTypographyProps> = {
      selectable: true,
    };

    if (context.bold) {
      props.fontStyle = 'bold';
    }

    if (context.italic) {
      props.style = {
        ...(typeof props.style === 'object' && !Array.isArray(props.style) ? props.style : {}),
        fontStyle: 'italic',
      };
    }

    if (context.fontSize) {
      props.size = context.fontSize;
    }

    return props;
  }, []);

  const getTextContent = useCallback((node: ChildNode): string => {
    if (node.type === 'text') {
      return (node as DOMText).data;
    }
    if (node.type === 'tag') {
      const element = node as Element;
      return element.children.map(child => getTextContent(child)).join('');
    }
    return '';
  }, []);

  const renderNode = useCallback(
    (node: ChildNode, context: StyleContext, key: string): ReactNode => {
      // Text node
      if (node.type === 'text') {
        const textNode = node as DOMText;
        if (!textNode.data.trim()) return null;
        return (
          <Typography key={key} {...getTypographyProps(context)}>
            {textNode.data}
          </Typography>
        );
      }

      // Element node
      if (node.type === 'tag') {
        const element = node as Element;
        const newContext = { ...context };

        switch (element.name) {
          case 'b':
          case 'strong':
            newContext.bold = true;
            break;
          case 'i':
          case 'em':
            newContext.italic = true;
            break;
          case 'u':
            newContext.underline = true;
            break;
        }

        // Handle ordered lists
        if (element.name === 'ol') {
          newContext.listType = 'ordered';
          let listItemIndex = 0;
          const children = element.children.map((child, index) => {
            const childElement = child as Element;
            const childContext =
              childElement.type === 'tag' && childElement.name === 'li'
                ? { ...newContext, listIndex: listItemIndex++ }
                : newContext;
            return renderNode(child, childContext, `${key}-${index}`);
          });
          return (
            <View key={key} style={{ marginBottom: 16 }}>
              {children}
            </View>
          );
        }

        // Handle unordered lists
        if (element.name === 'ul') {
          newContext.listType = 'unordered';
          const children = element.children.map((child, index) => renderNode(child, newContext, `${key}-${index}`));
          return (
            <View key={key} style={{ marginBottom: 16 }}>
              {children}
            </View>
          );
        }

        // Handle list items
        if (element.name === 'li') {
          const currentIndex = context.listIndex ?? 0;
          const bullet = context.listType === 'ordered' ? `${currentIndex + 1}. ` : '• ';
          const children = element.children.map((child, index) => renderNode(child, newContext, `${key}-${index}`));

          const props = getTypographyProps(context);
          return (
            <Typography key={key} {...props} style={[{ marginBottom: 8, marginLeft: 16 }, props.style]}>
              {bullet}
              {children}
            </Typography>
          );
        }

        const children = element.children.map((child, index) => renderNode(child, newContext, `${key}-${index}`));

        // Handle anchor tags
        if (element.name === 'a') {
          const href = element.attribs.href;
          if (href) {
            // Extract text content instead of rendering Typography children
            const textContent = element.children.map(child => getTextContent(child)).join('');
            return (
              <InlineLink href={href} key={key} onLinkPress={handleLinkPress} {...getTypographyProps(newContext)}>
                {textContent}
              </InlineLink>
            );
          }
        }

        // Handle paragraphs
        if (element.name === 'p') {
          return (
            <Typography key={key} {...getTypographyProps(context)}>
              {children}
            </Typography>
          );
        }

        // Handle breaks
        if (element.name === 'br') {
          return <Typography key={key}>{'\n'}</Typography>;
        }

        // Default: just render children
        return <Fragment key={key}>{children}</Fragment>;
      }

      return null;
    },
    [getTypographyProps, handleLinkPress, getTextContent],
  );

  const renderHtml = useCallback(() => {
    const dom = parseDocument(source.html, { decodeEntities: true });
    const context: StyleContext = { fontSize };

    return dom.children.map((node, index) => renderNode(node, context, `root-${index}`));
  }, [source.html, fontSize, renderNode]);

  return renderHtml();
};

export default memo(HtmlRenderer);
