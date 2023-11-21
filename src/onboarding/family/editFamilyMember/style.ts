import styled from 'styled-components/native';

import { Button, TouchableRipple, Typography } from '../../../_components';
import { theme } from '../../../_styles/theme';

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

export const SelectedAvatarImage = styled.Image`
  width: 96px;
  height: 96px;
  border-radius: 48px;
  margin-vertical: 24px;
`;

export const Description = styled(Typography)`
  font-size: 12px;
`;

export const AvatarItemBorder = styled(TouchableRipple)<{ isSelected: boolean }>`
  margin-horizontal: 8px;
  border: ${({ isSelected }) => `2px solid ${isSelected ? theme.palette.primary['700'] : 'transparent'}`};
  border-radius: 26px;
`;

export const AvatarItemContainer = styled.View`
  padding: 2px;
`;

export const AvatarItemImage = styled.Image`
  width: 48px;
  height: 48px;
`;

export const ListFooter = styled.View`
  flex-direction: row;
  justify-content: center;
  margin-top: 24px;
`;

export const DeleteMemberButton = styled(Button)`
  margin-left: 8px;
`;

export const StickyFooter = styled.View`
  padding-horizontal: 16px;
  padding-top: 16px;
  background-color: ${theme.palette.neutral['0']};
`;
