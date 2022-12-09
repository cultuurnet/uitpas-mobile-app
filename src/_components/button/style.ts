import styled from 'styled-components/native';

import { getColor } from '../../_utils/colorHelper';
import TouchableRipple from '../touchableRipple/TouchableRipple';
import Typography from '../typography/Typography';
import { TButtonPropsBase } from './Button';

export const ButtonContainer = styled.View<Pick<TButtonPropsBase, 'inline' | 'centered'>>`
  align-self: ${({ inline, centered }) => (centered ? 'center' : inline ? 'flex-start' : 'stretch')};
`;

export const ButtonElement = styled(TouchableRipple)<{
  $active: boolean;
  $inline: TButtonPropsBase['inline'];
  $radius: TButtonPropsBase['radius'];
  $variant: TButtonPropsBase['variant'];
  centered?: TButtonPropsBase['centered'];
  disabled: TButtonPropsBase['disabled'];
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
  padding: ${({ $variant, $inline }) =>
    $inline && $variant !== 'link' ? '12px 16px' : $variant !== 'link' ? '12px 20px' : '0px'};
  border: ${({ $variant, theme }) => ($variant === 'outline' ? `2px solid ${theme.palette.neutral['0']}` : 'none')};
`;

export const ButtonText = styled(Typography)<{
  $active: boolean;
  $color: TButtonPropsBase['color'];
  $underline: boolean;
  $variant: TButtonPropsBase['variant'];
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
