import styled from 'styled-components/native';

import { theme } from '../../_styles/theme';
import Typography from '../typography/Typography';

export const TextInput = styled.TextInput<{ isError?: boolean }>`
  border-color: ${({ theme, isError }) => (!isError ? theme.palette.neutral['200'] : theme.palette.error['500'])};
  border-width: 1px;
  border-radius: 8px;
  color: ${theme.palette.neutral['900']};
  font-family: 'Poppins-Regular';
  height: 44px;
  padding-horizontal: 16px;
  padding-vertical: 12px;
`;

export const Label = styled(Typography)`
  font-size: 12px;
  margin-bottom: 4px;
`;

export const Description = styled(Typography)`
  margin-top: 8px;
`;
