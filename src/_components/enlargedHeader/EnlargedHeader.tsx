import React from 'react';

import * as Styled from './style';

type TProps = {
  height?: number;
};

const EnlargedHeader = ({ height = 116 }: TProps) => {
  return <Styled.TopContainerHalf height={height} />;
};

export default EnlargedHeader;
