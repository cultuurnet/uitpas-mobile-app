import styled from 'styled-components/native';

import { Typography } from '../../../_components';

export const Container = styled.View<{ type: 'success' | 'error' }>`
  width: 32px;
  height: 32px;
  border-radius: 16px;
  border: ${({ type, theme }) => `4px solid ${type === 'success' ? theme.palette.primary['200'] : theme.palette.error['200']}`};
  justify-content: center;
  align-items: center;
`;

export const Label = styled(Typography)`
  line-height: 24px; // $height - $borderWidth
`;
