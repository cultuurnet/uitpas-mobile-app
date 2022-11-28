import { Pressable } from 'react-native';
import styled from 'styled-components/native';

import Typography from '../typography/Typography';
import { TButtonPropsBase } from './Button';

export const ButtonContainer = styled.View<Pick<TButtonPropsBase, 'inline' | 'centered'>>`
  align-self: ${({ inline, centered }) => (centered ? 'center' : inline ? 'flex-start' : 'stretch')};
`;

export const ButtonElement = styled(Pressable)<{
  $active: boolean;
  $inline: TButtonPropsBase['inline'];
  $variant: TButtonPropsBase['variant'];
  centered?: TButtonPropsBase['centered'];
  disabled: TButtonPropsBase['disabled'];
}>`
  align-self: ${({ $inline, centered }) => (centered ? 'center' : $inline ? 'flex-start' : 'stretch')};
  align-items: center;
  border-radius: 16px;
  opacity: ${({ disabled }) => (disabled ? 0.4 : 1)};
  background-color: ${({ $active, $variant, theme }) => {
    if ($variant === 'contained') {
      return $active ? theme.colors.turquoiseActive : theme.colors.turquoise;
    }
    return 'transparent';
  }};
  padding: ${({ $variant, $inline }) =>
    $inline && $variant !== 'link' ? '6px 16px' : $variant !== 'link' ? '10px 16px' : '0px'};
  border: ${({ $variant, theme }) => ($variant === 'outline' ? `2px solid ${theme.colors.white}` : 'none')};
`;

export const ButtonText = styled(Typography)<{
  $active: boolean;
  $color: TButtonPropsBase['color'];
  $underline: boolean;
  $variant: TButtonPropsBase['variant'];
}>`
  color: ${({ $variant, $active, $color, theme }) => {
    if ($color) return theme.colors[$color];
    if ($variant === 'link') {
      return $active ? theme.colors.turquoiseActive : theme.colors.turquoise;
    } else if ($variant === 'outline') {
      return theme.colors.white;
    }

    return theme.colors.white;
  }};
  text-decoration: ${({ $variant, $underline }) => ($variant === 'link' && $underline ? 'underline' : 'none')};
  text-decoration-color: ${({ $active, theme, $color }) =>
    $color ? $color : $active ? theme.colors.buttonActive : theme.colors.button};
`;
