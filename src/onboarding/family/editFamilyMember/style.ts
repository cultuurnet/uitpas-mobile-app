import styled from 'styled-components/native';
import { Image as ExpoImage } from 'expo-image';

import { PressableRipple, Typography } from '../../../_components';
import { theme } from '../../../_styles/theme';
import DeleteFamilyMember from '../deleteFamilyMember/DeleteFamilyMember';

export const ScreenContainer = styled.View`
  flex: 1;
  padding-top: 16px;
  background-color: ${theme.palette.neutral['0']};
`;

export const Header = styled.View`
  align-items: center;
`;

export const UitpasNumber = styled(Typography)`
  margin-top: 8px;
`;

export const SelectedAvatarImage = styled(ExpoImage)`
  width: 96px;
  height: 96px;
  border-radius: 48px;
  margin-vertical: 24px;
`;

export const Description = styled(Typography)`
  font-size: 12px;
`;

export const AvatarItemBorder = styled(PressableRipple)<{ isSelected: boolean }>`
  margin-horizontal: 8px;
  border-width: 2px;
  border-color: ${({ isSelected }) => (isSelected ? theme.palette.primary['700'] : 'transparent')};
  border-radius: 27px;
`;

export const AvatarItemContainer = styled.View`
  padding: 2px;
`;

export const AvatarItemImage = styled(ExpoImage)`
  width: 48px;
  height: 48px;
`;

export const DeleteFamilyMemberButton = styled(DeleteFamilyMember)`
  margin-horizontal: 8px;
  margin-top: 24px;
`;

export const StickyFooter = styled.View`
  padding-horizontal: 16px;
  padding-top: 16px;
  background-color: ${theme.palette.neutral['0']};
`;
