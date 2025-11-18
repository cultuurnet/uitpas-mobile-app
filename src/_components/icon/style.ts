import styled, { css } from 'styled-components/native';

import { TIconProps } from './Icon';
import PressableRipple from '../pressable/PressableRipple';

export const IconButton = styled(PressableRipple)<{ borderless?: boolean; disabled?: boolean }>`
  opacity: ${({ disabled }) => (disabled ? 0.6 : 1)};
`;

export const Icon = styled.Image<Pick<TIconProps, 'size' | 'color'>>`
  ${({ size }) => {
    const imageSize = typeof size === 'number' ? size : size === 'small' ? 16 : size === 'large' ? 40 : 20;
    return css`
      width: ${imageSize}px;
      height: ${imageSize}px;
    `;
  }}
`;
