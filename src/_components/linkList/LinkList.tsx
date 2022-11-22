import React, { FC } from 'react';

import { Theme } from '../../_styles/theme';
import Icon, { TIconName } from '../icon/Icon';
import Typography from '../typography/Typography';
import * as Styled from './style';

type TLinkTypes = { href: string; onPress?: never } | { href?: never; onPress: () => void };

export type TLinkListItem = {
  iconColor?: keyof Theme['colors'];
  iconName: TIconName;
  label: string;
  labelColor?: keyof Theme['colors'];
} & TLinkTypes;

type TProps = {
  items: TLinkListItem[];
  title?: string;
};

const LinkList: FC<TProps> = ({ items, title, ...props }) => {
  function renderItem(item: Partial<TLinkListItem>) {
    return (
      <Styled.LinkItem key={item.label}>
        <Icon color={item.iconColor || 'teal'} name={item.iconName} />
        {item.href ? (
          <Styled.LinkButton
            color={item.labelColor || 'text'}
            fontStyle="normal"
            href={item.href}
            label={item.label}
            variant="link"
          />
        ) : (
          <Styled.LinkButton
            color={item.labelColor || 'text'}
            fontStyle="normal"
            label={item.label}
            onPress={item.onPress}
            underline={false}
            variant="link"
          />
        )}
      </Styled.LinkItem>
    );
  }
  return (
    <Styled.LinkContainer {...props}>
      {title && (
        <Styled.LinkItem>
          <Typography>{title}</Typography>
        </Styled.LinkItem>
      )}
      {items.map(item => renderItem(item))}
    </Styled.LinkContainer>
  );
};

export default LinkList;
