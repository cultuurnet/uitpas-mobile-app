import { FC } from 'react';

import { Logo, LogoInverse } from '../../_assets/images';
import * as Styled from './style';

type TProps = {
  height?: number;
  inverse?: boolean;
};

const BrandLogo: FC<TProps> = ({ inverse, height = 24 }) => {
  return <Styled.LogoImage accessible={false} contentFit="contain" height={height} source={inverse ? LogoInverse : Logo} />;
};

export default BrandLogo;
