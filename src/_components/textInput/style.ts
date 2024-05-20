import styled from 'styled-components/native';

import { theme } from '../../_styles/theme';
import Typography from '../typography/Typography';

export const TextInput = styled.TextInput<{ isError?: boolean }>`
  border-color: ${({ theme, isError }) => (!isError ? theme.palette.neutral['200'] : theme.palette.error['500'])};
  border-width: 1px;
  border-radius: 8px;
  color: ${theme.palette.neutral['900']};
  font-family: 'Poppins-Regular';
  font-size: 16px;
  padding-horizontal: 16px;
  padding-vertical: 8px;
`;

export const Label = styled(Typography)`
  font-size: 12px;
  line-height: 18px;
  margin-bottom: 4px;
`;

export const LabelContainer = styled.View`
  margin-bottom: 4px;
`;

export const Description = styled(Typography)`
  margin-top: 8px;
`;

export const DescriptionContainer = styled.View`
  margin-top: 8px;
`;
