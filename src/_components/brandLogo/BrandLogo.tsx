import { FC } from 'react';
import { Image } from 'react-native';

type TProps = {
  height?: number;
  inverse?: boolean;
};

const BrandLogo: FC<TProps> = ({ inverse, height = 24 }) => {
  return (
    <Image
      resizeMode="contain"
      source={inverse ? require('../../_assets/images/logoInverse.png') : require('../../_assets/images/logo.png')}
      style={{ height }}
    />
  );
};

export default BrandLogo;
