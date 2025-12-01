import styled from 'styled-components/native';

import Typography from '../typography/Typography';

export const UnderlinedLinkText = styled(Typography)<{ variant?: 'default' | 'light' }>`
  color: ${({ theme, variant }) => (variant === 'light' ? theme.palette.neutral['0'] : theme.palette.primary['800'])};
  text-decoration: underline;
  text-decoration-color: ${({ theme }) => theme.palette.primary['800']};
`;
