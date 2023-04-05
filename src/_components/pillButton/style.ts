import styled from 'styled-components/native';

import { theme } from '../../_styles/theme';
import Button from '../button/Button';
import Typography from '../typography/Typography';

export const PillButton = styled(Button)`
  padding: 8px 14px;
  border-radius: 20px;
  background-color: ${theme.palette.neutral['0']};
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
