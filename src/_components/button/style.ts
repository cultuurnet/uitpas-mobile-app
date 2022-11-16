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
  disabled: TButtonPropsBase['disabled'];
}>`
  align-items: center;
  border-radius: 16px;
  opacity: ${({ disabled }) => (disabled ? 0.4 : 1)};
  background-color: ${({ $active, $variant, theme }) => {
    if ($variant === 'contained') {
      return $active ? theme.colors.turquoiseActive : theme.colors.turquoise;
    }
    return 'transparent';
  }};
  padding: ${({ $variant, $inline }) => ($inline ? '6px 16px' : $variant !== 'link' ? '10px 16px' : '0px')};
  border: ${({ $variant, theme }) => ($variant === 'outline' ? `2px solid ${theme.colors.white}` : 'none')};
`;

export const ButtonText = styled(Typography)<{ $active: boolean; $variant: TButtonPropsBase['variant'] }>`
  color: ${({ $variant, $active, theme }) => {
    if ($variant === 'link') {
      return $active ? theme.colors.turquoiseActive : theme.colors.turquoise;
    } else if ($variant === 'outline') {
      return theme.colors.turquoise;
    }

    return theme.colors.white;
  }};
  text-decoration: ${({ $variant }) => $variant === 'link' && 'underline'};
  text-decoration-color: ${({ $active, theme }) => ($active ? theme.colors.turquoiseActive : theme.colors.turquoise)};
`;
