import React, { memo } from 'react';

import * as Styled from './style';

type TProps = {
  children: React.ReactNode;
  title: string;
};

export const Section = memo(({ title, children }: TProps) => {
  return (
    <Styled.Section>
      <Styled.SectionTitle color="primary.800" fontStyle="bold">
        {title}
      </Styled.SectionTitle>
      {children}
    </Styled.Section>
  );
});
