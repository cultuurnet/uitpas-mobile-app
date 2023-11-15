import styled from 'styled-components/native';

import { Button, TouchableRipple, Typography } from '../../../_components';
import { theme } from '../../../_styles/theme';

export const Header = styled.View`
  justify-content: center;
  align-items: center;
  height: 133px;
  background-color: ${theme.palette.primary['700']};
  padding: 16px;
  margin-bottom: 8px;
`;

export const MyAvatar = styled.Image`
  width: 64px;
  height: 64px;
  border: 4px solid ${theme.palette.neutral['0']};
  border-radius: 32px;
`;

export const MyName = styled(Typography)`
  font-size: 14px;
  line-height: 21px;
  margin-top: 16px;
`;

export const FormItemContainer = styled.View`
  flex: 1;
  height: 133px;
  margin-horizontal: 8px;
`;

export const FormItemButton = styled(TouchableRipple)`
  flex: 1;
  height: 133px;
  border-radius: 16px;
  margin-horizontal: 8px;
`;

export const FormItem = styled.View`
  justify-content: space-between;
  align-items: center;
  height: 100%;
  border-radius: 16px;
  background-color: ${theme.palette.neutral['0']};
  padding: 16px;
`;

export const FormItemLabel = styled(Typography)`
  font-size: 14px;
  line-height: 21px;
`;

export const FamilyMemberAvatar = styled.Image`
  width: 64px;
  height: 64px;
`;

export const AddIconContainer = styled.View`
  justify-content: center;
  align-items: center;
  width: 48px;
  height: 48px;
  border: 4px solid ${theme.palette.primary['400']};
  border-radius: 24px;
`;

export const ConfirmButton = styled(Button)`
  margin: 16px;
`;
