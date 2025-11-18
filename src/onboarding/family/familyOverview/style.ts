import styled from 'styled-components/native';
import { Image as ExpoImage } from 'expo-image';

import { Button, PressableRipple, Typography } from '../../../_components';
import { theme } from '../../../_styles/theme';

export const Header = styled.View`
  align-items: center;
  height: 133px;
  background-color: ${theme.palette.primary['700']};
  padding: 16px;
  margin-bottom: 8px;
`;

export const HeaderContent = styled(PressableRipple)`
  width: 60%;
  align-items: center;
`;

export const MyAvatar = styled.Image`
  width: 64px;
  height: 64px;
  border-width: 4px;
  border-color: ${theme.palette.neutral['0']};
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

export const FormItemButtonWrapper = styled.View`
  flex: 1;
  height: 133px;
  margin-horizontal: 8px;
  border-radius: 16px;
  overflow: hidden;
`;

export const FormItem = styled.View`
  justify-content: space-between;
  align-items: center;
  height: 100%;
  border-radius: 16px;
  background-color: ${theme.palette.neutral['0']};
  padding: 16px;
`;

export const FormItemBody = styled.View`
  flex: 1;
  justify-content: center;
`;

export const FormItemLabel = styled(Typography)`
  font-size: 14px;
  line-height: 21px;
`;

export const FamilyMemberAvatar = styled(ExpoImage)`
  width: 64px;
  height: 64px;
`;

export const EditProfileIconContainer = styled.View`
  position: absolute;
  bottom: -3px;
  right: -3px;
  width: 24px;
  height: 24px;
  border-radius: 12px;
  justify-content: center;
  align-items: center;
  background-color: ${theme.palette.neutral['900']};
`;

export const AddIconContainer = styled.View`
  justify-content: center;
  align-items: center;
  width: 48px;
  height: 48px;
  border-width: 4px;
  border-color: ${theme.palette.primary['400']};
  border-radius: 24px;
`;

export const ConfirmButton = styled(Button)`
  margin: 16px;
`;
