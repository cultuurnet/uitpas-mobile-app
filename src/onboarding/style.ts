import styled from 'styled-components/native';

import { Button, Checkbox, Typography } from '../_components';

export const ViewContainer = styled.ScrollView`
  background-color: ${({ theme }) => theme.palette.neutral['0']};
`;

export const TopContainer = styled.View`
  padding: 0px 16px;
  align-items: center;
`;

export const TitleText = styled(Typography)`
  margin-top: 16px;
`;

export const IntroText = styled(Typography)`
  margin-top: 24px;
`;

export const ConfirmCheckbox = styled(Checkbox)`
  margin-top: 24px;
  width: 100%;
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
  position: absolute;
  bottom: 35px;
  width: 100%;
`;

export const LinkButton = styled(Button)`
  margin: 0 5px;
`;

export const ConfirmButton = styled(Button)`
  margin: 0 auto;
  width: 90%;
`;
