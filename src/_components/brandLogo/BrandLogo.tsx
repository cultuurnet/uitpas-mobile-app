import { FC } from 'react';
import { Image } from 'react-native';

import { Logo, LogoInverse } from '../../_assets/images';

type TProps = {
  height?: number;
  inverse?: boolean;
};

const BrandLogo: FC<TProps> = ({ inverse, height = 24 }) => {
  return <Image resizeMode="contain" source={inverse ? LogoInverse : Logo} style={{ height }} />;
};

export default BrandLogo;
