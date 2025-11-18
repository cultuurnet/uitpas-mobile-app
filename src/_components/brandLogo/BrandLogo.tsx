import { FC } from 'react';
import { Image } from 'expo-image';

import { Logo, LogoInverse } from '../../_assets/images';

type TProps = {
  height?: number;
  inverse?: boolean;
};

const BrandLogo: FC<TProps> = ({ inverse, height = 24 }) => {
  return <Image contentFit="contain" source={inverse ? LogoInverse : Logo} style={{ height }} />;
};

export default BrandLogo;
