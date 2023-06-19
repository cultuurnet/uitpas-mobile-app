import styled from 'styled-components/native';

import { theme } from '../../_styles/theme';
import Button from '../button/Button';
import Typography from '../typography/Typography';

export const PillButton = styled(Button)<{ $hasCount: boolean }>`
  padding: 8px 14px;
  border-radius: 20px;
  background-color: ${({ $hasCount }) => ($hasCount ? theme.palette.primary['800'] : theme.palette.neutral['0'])};
  align-items: center;
  flex-direction: row;
  elevation: 1;
  shadow-color: ${theme.palette.primary[800]};
  shadow-offset: 0px 2px;
  shadow-opacity: 0.05;
  shadow-radius: 2px;
`;

export const PillButtonLabel = styled(Typography)`
  margin-left: 8px;
`;

export const PillButtonCount = styled(Typography)`
  margin-left: 8px;
  font-size: 10px;
  line-height: 14px;
  padding: 2px 6px;
  background: white;
  color: ${theme.palette.primary[800]};
  border-radius: 9px;
  font-weight: bold;
  overflow: hidden;
`;
