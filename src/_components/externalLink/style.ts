import styled from 'styled-components/native';

import { theme } from '../../_styles/theme';
import Button from '../button/Button';
import Typography from '../typography/Typography';

export const LinkButton = styled(Button)`
  flex-direction: row;
`;

export const UnderlinedLinkText = styled(Typography)`
  margin-left: 8px;
  text-decoration: underline;
  text-decoration-color: ${theme.palette.primary['800']};
`;
