import styled from 'styled-components/native';
import { Button, Typography, Checkbox } from '../_components';

export const ViewContainer = styled.ScrollView`
  background-color: ${({ theme }) => theme.colors.white};
`;

export const TopContainer = styled.View`
  padding: 40px 16px;
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
  padding: 40px 16px;
  margin-left: 2.5%;
  position: absolute;
  bottom: 0px;
  width: 95%;
  align-items: center;
`;

export const LinkButton = styled(Button)`
  margin-left: 5px;
`;

export const ConfirmButton = styled(Button)``;
