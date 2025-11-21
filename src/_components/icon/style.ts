import { Image as ExpoImage } from 'expo-image';
import styled, { css } from 'styled-components/native';

import PressableRipple from '../pressable/PressableRipple';
import { TIconProps } from './Icon';

export const IconButton = styled(PressableRipple)<{ borderless?: boolean; disabled?: boolean }>`
  opacity: ${({ disabled }) => (disabled ? 0.6 : 1)};
`;

export const Icon = styled(ExpoImage)<Pick<TIconProps, 'size' | 'color'>>`
  ${({ size }) => {
    const imageSize = typeof size === 'number' ? size : size === 'small' ? 16 : size === 'large' ? 40 : 20;
    return css`
      width: ${imageSize}px;
      height: ${imageSize}px;
    `;
  }}
`;
