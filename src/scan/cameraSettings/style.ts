import styled from 'styled-components/native';

import { Button, Typography } from '../../_components';

export const TopContainer = styled.View`
  padding: 0px 16px;
  align-items: center;
`;

export const TitleText = styled(Typography)`
  margin-top: 42px;
`;

export const Image = styled.Image`
  margin-top: 60px;
`;

export const IntroText = styled(Typography)`
  margin-top: 42px;
`;

export const LabelText = styled(Typography)`
  margin-left: 5px;
`;

export const BottomContainer = styled.View`
  position: absolute;
  bottom: 35px;
  width: 100%;
`;

export const ConfirmButton = styled(Button)`
  margin: 0 auto;
  width: 90%;
`;
