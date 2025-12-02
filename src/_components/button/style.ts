import styled from 'styled-components/native';

import { getColor } from '../../_utils';
import PressableRipple from '../pressable/PressableRipple';
import Typography from '../typography/Typography';
import { TButtonProps } from './Button';

export const ButtonContainer = styled.View<Pick<TButtonProps, 'inline' | 'centered'>>`
  align-self: ${({ inline, centered }) => (centered ? 'center' : inline ? 'flex-start' : 'stretch')};
`;

export const ButtonElement = styled(PressableRipple)<{
  $active: boolean;
  $backgroundColor: TButtonProps['backgroundColor'];
  $color: TButtonProps['color'];
  $inline: TButtonProps['inline'];
  $radius: TButtonProps['radius'];
  $variant: TButtonProps['variant'];
  centered?: TButtonProps['centered'];
  disabled: TButtonProps['disabled'];
  loading: TButtonProps['loading'];
}>`
  align-self: ${({ $inline, centered }) => (centered ? 'center' : $inline ? 'flex-start' : 'stretch')};
  align-items: center;
  border-radius: ${({ $inline, $radius, $variant }) => (!$radius || $variant === 'link' ? '0px' : $inline ? '24px' : '16px')};
  opacity: ${({ disabled }) => (disabled ? 0.4 : 1)};
  background-color: ${({ $active, $variant, $backgroundColor, theme }) => {
    if ($backgroundColor) {
      return getColor($backgroundColor);
    }
    if ($variant === 'contained') {
      return $active ? theme.palette.primary['900'] : theme.palette.primary['700'];
    }
    return 'transparent';
  }};
  overflow: hidden;
  padding: ${({ $variant, $inline }) =>
    $inline && $variant !== 'link' ? '12px 16px' : $variant !== 'link' ? '12px 20px' : '0px'};
  border-width: ${({ $variant }) => ($variant === 'outline' ? '2px' : 0)};
  border-color: ${({ $variant, theme, $color }) =>
    $variant === 'outline' ? ($color ? getColor($color) : theme.palette.neutral['0']) : 'none'};
`;

export const ButtonText = styled(Typography)<{
  $active: boolean;
  $color: TButtonProps['color'];
  $underline: boolean;
  $variant: TButtonProps['variant'];
}>`
  color: ${({ $variant, $active, $color, theme }) => {
    if ($color) return getColor($color);
    if ($variant === 'link') {
      return $active ? theme.palette.primary['900'] : theme.palette.primary['700'];
    } else if ($variant === 'outline') {
      return theme.palette.neutral['0'];
    }

    return theme.palette.neutral['0'];
  }};
  text-decoration: ${({ $variant, $underline }) => ($variant === 'link' && $underline ? 'underline' : 'none')};
  text-decoration-color: ${({ $active, theme, $color }) =>
    $color ? getColor($color) : $active ? theme.palette.primary['900'] : theme.palette.primary['700']};
`;
