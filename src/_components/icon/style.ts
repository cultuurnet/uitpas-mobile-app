import styled, { css } from 'styled-components/native';

import TouchableRipple from '../touchableRipple/TouchableRipple';
import { TIconProps } from './Icon';

export const IconButton = styled(TouchableRipple)<{ borderless?: boolean; disabled?: boolean }>`
  overflow: ${({ borderless }) => borderless && 'visible'};
  opacity: ${({ disabled }) => (disabled ? 0.6 : 1)};
`;

export const Icon = styled.Image<Pick<TIconProps, 'size' | 'color'>>`
  tint-color: ${({ color, theme }) => color && theme.colors[color]};
  ${({ size }) => {
    const imageSize = typeof size === 'number' ? size : size === 'small' ? 16 : size === 'large' ? 40 : 20;
    return css`
      width: ${imageSize}px;
      height: ${imageSize}px;
    `;
  }}
`;
