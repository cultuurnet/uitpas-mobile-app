import styled from 'styled-components/native';

import { getColor } from '../../_utils';
import TouchableRipple from '../touchableRipple/TouchableRipple';
import Typography from '../typography/Typography';
import { TButtonProps } from './Button';

export const ButtonContainer = styled.View<Pick<TButtonProps, 'inline' | 'centered'>>`
  align-self: ${({ inline, centered }) => (centered ? 'center' : inline ? 'flex-start' : 'stretch')};
`;

export const ButtonElement = styled(TouchableRipple)<{
  $active: boolean;
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
  border-radius: ${({ $inline, $radius }) => (!$radius ? '0px' : $inline ? '24px' : '16px')};
  opacity: ${({ disabled }) => (disabled ? 0.4 : 1)};
  background-color: ${({ $active, $variant, theme }) => {
    if ($variant === 'contained') {
      return $active ? theme.palette.primary['900'] : theme.palette.primary['700'];
    }
    return 'transparent';
  }};
  overflow: hidden;
  padding: ${({ $variant, $inline }) =>
    $inline && $variant !== 'link' ? '12px 16px' : $variant !== 'link' ? '12px 20px' : '0px'};
  border: ${({ $variant, theme, $color }) =>
    $variant === 'outline' ? `2px solid ${$color ? getColor($color) : theme.palette.neutral['0']}` : 'none'};
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
    $color ? $color : $active ? theme.palette.primary['900'] : theme.palette.primary['700']};
`;
