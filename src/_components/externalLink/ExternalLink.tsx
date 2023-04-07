import React from 'react'

import Icon from '../icon/Icon';
import * as Styled from './style';

type TProps = {
  href: string;
};

const ExternalLink = ({ href }: TProps) => {
  if (!href) return null;

  const url = new URL(href);

  return (
    <Styled.LinkButton
      href={href}
      inline
      radius={false}
      variant="link"
    >
      <>
        <Icon color='primary.500' name='External' size="small" />
        <Styled.UnderlinedLinkText color='primary.800' size="small">{url.hostname}</Styled.UnderlinedLinkText>
      </>
    </Styled.LinkButton>
  )
}

export default ExternalLink;