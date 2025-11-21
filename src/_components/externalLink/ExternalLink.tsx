import React from 'react';

import { normalizeUrl } from '../../_utils/normalizeHelpers';
import Icon from '../icon/Icon';
import * as Styled from './style';

type TProps = {
  href: string;
  label?: string;
  onPress?: () => void;
};

const ExternalLink = ({ href, label, ...props }: TProps) => {
  if (!href?.trim()) return null;

  try {
    const fullHref = normalizeUrl(href);
    const url = new URL(fullHref);
    return (
      <Styled.LinkButton href={fullHref} inline radius={false} variant="link" {...props}>
        <>
          <Icon color="primary.500" name="External" size="small" />
          <Styled.UnderlinedLinkText color="primary.800" size="small">
            {label || url.hostname}
          </Styled.UnderlinedLinkText>
        </>
      </Styled.LinkButton>
    );
  } catch {
    return null;
  }
};

export default ExternalLink;
