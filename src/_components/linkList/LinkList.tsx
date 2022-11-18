import React, { FC } from 'react';

import { Theme } from '../../_styles/theme';
import Icon, { TIconName } from '../icon/Icon';
import * as Styled from './style';

type TLinkTypes = { href: string; onPress?: never } | { href?: never; onPress: () => void };

export type TLinkListItem = {
  iconColor: keyof Theme['colors'];
  iconName: TIconName;
  label: string;
  labelColor: keyof Theme['colors'];
} & TLinkTypes;

type TProps = {
  items: TLinkListItem[];
};

const LinkList: FC<TProps> = ({ items, ...props }) => {
  function renderItem(item: TLinkListItem) {
    return (
      <Styled.LinkItem key={item.label}>
        <Icon color={item.iconColor} name={item.iconName} />
        {item.href ? (
          <Styled.LinkButton color={item.labelColor} fontStyle="normal" href={item.href} label={item.label} variant="link" />
        ) : (
          <Styled.LinkButton
            color={item.labelColor}
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
  return <Styled.LinkContainer {...props}>{items.map(item => renderItem(item))}</Styled.LinkContainer>;
};

export default LinkList;
