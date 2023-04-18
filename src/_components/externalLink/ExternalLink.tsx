import React from 'react'

import Icon from '../icon/Icon';
import * as Styled from './style';

type TProps = {
  href: string;
};

const ExternalLink = ({ href }: TProps) => {
  if (!href?.trim()) return null;

  try {
    let fullHref = href;
    if (!href.startsWith('http')) fullHref = `https://${href}`;
    const url = new URL(fullHref);
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
    );
  } catch (error) {
    return null;
  }

}

export default ExternalLink;