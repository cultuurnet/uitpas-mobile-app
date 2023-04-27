import React from 'react'

import * as Styled from './style';

type TProps = {
  height?: number;
};

const EnlargeHeader = ({ height = 116 }: TProps) => {
  return (
    <Styled.TopContainerHalf height={height} />
  )
}

export default EnlargeHeader;