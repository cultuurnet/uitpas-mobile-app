import React, { useState } from 'react';

import { Gift } from '../../_assets/images';
import * as Styled from './style';

type TProps = {
  children?: React.ReactNode;
  hasRadius?: boolean;
  largeSpacing?: boolean;
  picture?: string;
};

const RewardImage = ({ children, picture, hasRadius = false, largeSpacing = false, ...props }: TProps) => {
  const [isImageError, setIsImageError] = useState(false);

  return (
    <>
      <Styled.Image
        hasRadius={hasRadius}
        onError={() => setIsImageError(true)}
        contentFit="cover"
        source={!isImageError && picture ? { uri: picture } : Gift}
        {...props}
      />
      {!!children && (
        <Styled.Gradient colors={['#00000000', '#00000000', '#000000']} largeSpacing={largeSpacing}>
          {children}
        </Styled.Gradient>
      )}
    </>
  );
};

export default RewardImage;
