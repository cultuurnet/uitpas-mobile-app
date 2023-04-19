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
            <>
              <Icon color={item.iconColor || 'primary.600'} name={item.iconName} />
              <Styled.UnderlinedLinkText>{item.label}</Styled.UnderlinedLinkText>
              <Icon color='neutral.400' name='External' size={12} />
            </>
          </Styled.LinkButton>
        ) : (
          <Styled.LinkButton
            fontStyle="normal"
            label={item.label}
            onPress={item.onPress}
            radius={false}
            variant="link"
          >
            <>
              <Icon color={item.iconColor || 'primary.600'} name={item.iconName} />
              <Styled.LinkText color={item.labelColor || 'neutral.900'}>{item.label}</Styled.LinkText>
            </>
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
