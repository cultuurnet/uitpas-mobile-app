import styled from 'styled-components/native';
import { Image as ExpoImage } from 'expo-image';

import { Button, Checkbox, Typography } from '../_components';

export const TopContainer = styled.View`
  flex: 1;
  padding: 0px 16px;
  align-items: center;
`;

export const TitleText = styled(Typography)`
  margin-top: 42px;
`;

export const Image = styled(ExpoImage)`
  margin-top: 60px;
`;

export const IntroText = styled(Typography)`
  margin-top: 42px;
`;

export const ConfirmCheckbox = styled(Checkbox)`
  margin-top: 32px;
`;

export const LabelText = styled(Typography)`
  margin-left: 5px;
`;

export const ConfirmViewContainer = styled.View`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  margin-left: 14px;
`;

export const BottomContainer = styled.View`
  padding: 16px;
`;

export const LinkButton = styled(Button)`
  margin: 0 5px;
`;
