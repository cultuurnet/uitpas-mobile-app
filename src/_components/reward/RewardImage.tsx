import React, { useState } from 'react'

import { Gift } from '../../_assets/images';
import * as Styled from './style';

type TProps = {
  children?: React.ReactNode;
  hasRadius?: boolean;
  hideGradient?: boolean;
  largeSpacing?: boolean;
  picture?: string;
}

const RewardImage = ({ children, hideGradient = false, picture, hasRadius = false, largeSpacing = false }: TProps) => {
  const [isImageError, setIsImageError] = useState(false);

  return (
    <>
      <Styled.Image hasRadius={hasRadius} onError={() => setIsImageError(true)} source={!isImageError && picture ? { uri: picture } : Gift} />
      {!hideGradient && <Styled.Gradient colors={['#00000000', '#00000000', '#000000']} largeSpacing={largeSpacing}>
        {children}
      </Styled.Gradient>}
    </>
  )
}

export default RewardImage;