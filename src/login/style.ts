import { Image as ExpoImage } from 'expo-image';
import styled from 'styled-components/native';

import { Button, Typography } from '../_components';
import { TButtonProps } from '../_components/button/Button';

export const IntroText = styled(Typography)`
  margin-top: 16px;
`;

export const TopContainer = styled.View`
  padding: 40px 16px;
  align-items: center;
`;

export const BottomContainer = styled.View`
  margin-top: auto;
`;

export const ListItem = styled(Button)<TButtonProps>`
  margin-top: ${({ variant }) => (variant === 'link' ? '16px' : '36px')};
`;

export const Illustration = styled(ExpoImage)`
  width: 225px;
  height: 287px;
  margin-top: 24px;
  margin-bottom: -235px;
`;
