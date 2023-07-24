import styled from 'styled-components/native';

import Typography from '../typography/Typography';

export const UnderlinedLinkText = styled(Typography)`
  color: ${({ theme }) => theme.palette.primary['800']}};
  text-decoration: underline;
  text-decoration-color: ${({ theme }) => theme.palette.primary['800']}};
`;
