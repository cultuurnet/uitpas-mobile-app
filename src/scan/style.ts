import styled from 'styled-components/native';

import { Button, Checkbox } from '../_components';

export const BottomContainer = styled.View`
  align-items: center;
  max-width: 280px;
  align-self: center;
  margin-bottom: auto;
`;

export const SavedPoints = styled.View`
  margin-bottom: 24px;
  border-width: 5px;
  border-color: ${({ theme }) => theme.palette.primary['200']};
  width: 80px;
  height: 80px;
  align-items: center;
  justify-content: center;
  border-radius: 40px;
  overflow: hidden;
`;

export const ScanMoreButton = styled(Button)`
  margin-bottom: 16px;
`;

export const MemberCheckbox = styled(Checkbox)<{ isChecked: boolean }>`
  margin: 8px 0px;
  border-radius: 48px;
  padding: 8px 8px 8px 32px;
  background-color: ${({ theme, isChecked }) => (isChecked ? theme.palette.primary['700'] : theme.palette.neutral['100'])};
`;

export const FamilyAvatar = styled.Image`
  width: 48px;
  height: 48px;
  border: ${({ theme }) => `4px solid ${theme.palette.neutral['0']}`};
  border-radius: 32px;
`;
