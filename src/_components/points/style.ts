import styled from 'styled-components/native';

import { theme, ThemeColor } from '../../_styles/theme';
import Typography from '../typography/Typography';

type TPointsTheme = 'primary' | 'white';
export type TPointsProps = {
  large?: boolean;
  points: number;
  theme?: TPointsTheme;
};

export const PointsColor: Record<TPointsTheme, ThemeColor> = {
  primary: 'primary.800',
  white: 'neutral.0',
};

export const PointsContainer = styled.View<{ $theme: TPointsTheme }>`
  border-radius: 16px;
  padding: 0px 8px;
  flex-direction: row;
  align-items: center;
  border-width: 1px;
  border-color: ${({ $theme }) => ($theme === 'white' ? theme.palette.neutral[0] : theme.palette.primary[400])};
`;

export const PointsText = styled(Typography)`
  margin-right: 5px;
`;
