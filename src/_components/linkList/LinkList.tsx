import React, { FC } from 'react';

import { ThemeColor } from '../../_styles/theme';
import Icon, { TIconName } from '../icon/Icon';
import * as Styled from './style';

type TLinkTypes = { href: string; onPress?: never } | { href?: never; onPress: () => void };

export type TLinkListItem = {
  iconColor?: ThemeColor;
  iconName: TIconName;
  label: string;
  labelColor?: ThemeColor;
} & TLinkTypes;

type TProps = {
  items: TLinkListItem[];
  title?: string;
};

const LinkList: FC<TProps> = ({ items, title, ...props }) => {
  function renderItem(item: Partial<TLinkListItem>) {
    const buttonContent = (
      <>
        <Icon color={item.iconColor || 'primary.600'} name={item.iconName} />
        <Styled.LinkText>{item.label}</Styled.LinkText>
      </>
    );

    return (
      <Styled.LinkItem key={item.label}>
        {item.href ? (
          <Styled.LinkButton
            color={item.labelColor || 'neutral.900'}
            fontStyle="normal"
            href={item.href}
            label={item.label}
            radius={false}
            variant="link"
          >
            {buttonContent}
          </Styled.LinkButton>
        ) : (
          <Styled.LinkButton
            color={item.labelColor || 'neutral.900'}
            fontStyle="normal"
            label={item.label}
            onPress={item.onPress}
            radius={false}
            variant="link"
          >
            {buttonContent}
          </Styled.LinkButton>
        )}
      </Styled.LinkItem>
    );
  }
  return (
    <Styled.LinkContainer {...props}>
      {title && (
        <Styled.LinkItem>
          <Styled.HeaderText>{title}</Styled.HeaderText>
        </Styled.LinkItem>
      )}
      {items.map(item => renderItem(item))}
    </Styled.LinkContainer>
  );
};

export default LinkList;
