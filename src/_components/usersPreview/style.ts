import { Image as ExpoImage } from 'expo-image';
import styled from 'styled-components/native';

import { theme } from '../../_styles/theme';
import PressableOpacity from '../pressable/PressableOpacity';
import Typography from '../typography/Typography';

export const Container = styled(PressableOpacity)<{ $isSingleUser: boolean }>`
  flex-direction: row;
  align-items: center;
  height: 32px;
  ${({ $isSingleUser }) =>
    $isSingleUser
      ? `
    justify-content: center;
    padding: 2px 4px 2px 8px;
    border-width: 2px;
    border-radius: 16px;
    border-color: ${theme.palette.neutral[0]};
    background-color: ${theme.palette.neutral[0]};
  `
      : `
    align-self: flex-start;
    padding-horizontal: 4px;
    padding-vertical: 2px;
    border-radius: 18px;
    background-color: ${theme.palette.neutral[0]};
  `}
`;

export const Points = styled(Typography)`
  margin-right: 4px;
  color: ${theme.palette.primary[700]};
`;

export const AvatarImage = styled(ExpoImage)`
  width: 24px;
  height: 24px;
`;

export const MoreCount = styled(Typography)`
  font-size: 12px;
  margin-left: 4px;
`;
