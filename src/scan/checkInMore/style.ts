import styled from 'styled-components/native';

import { Button, Checkbox, SafeAreaView, Typography } from '../../_components';

export const SafeAreaViewContainer = styled(SafeAreaView)`
  flex: 1;
`;

export const FamilyMemberCheckbox = styled(Checkbox)<{ isChecked: boolean }>`
  border-radius: 48px;
  padding: 8px 8px 8px 32px;
  background-color: ${({ theme, isChecked }) => (isChecked ? theme.palette.primary['700'] : theme.palette.neutral['100'])};
`;

export const FamilyMemberLabel = styled.View`
  flex: 1;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const FamilyMemberName = styled(Typography)`
  margin-left: 16px;
`;

export const FamilyMemberAvatar = styled.Image`
  width: 48px;
  height: 48px;
  border-radius: 24px;
  border: ${({ theme }) => `4px solid ${theme.palette.neutral['0']}`};
`;

export const Divider = styled.View`
  height: 16px;
`;

export const CheckinButton = styled(Button)`
  margin: 16px;
`;
