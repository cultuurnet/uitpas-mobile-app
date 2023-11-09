import styled from 'styled-components/native';

import { Button, SafeAreaView, Typography } from '../_components';

export const TitleText = styled(Typography)`
  margin-bottom: 10px;
`;

export const ButtonContainer = styled.View`
  flex-direction: row;
  flex-grow: 1;
  justify-content: flex-end;
`;

export const ActionButton = styled(Button)`
  margin-left: 20px;
  margin-top: 20px;
  align-content: flex-end;
`;

export const SafeAreaViewContainer = styled(SafeAreaView)`
  background-color: ${({ theme }) => theme.palette.neutral['100']};
  padding-bottom: 95px;
`;

export const TopContent = styled.View`
  padding: 40px 16px;
`;

export const Divider = styled.View`
  height: 4px;
`;

export const TopContainer = styled.View`
  position: relative;
  /* background-color: ${({ theme }) => theme.palette.secondary['500']}; */
  padding: 0px 20px 5px 20px;
`;

export const ErrorMessage = styled(Typography)`
  max-width: 264px;
`;
