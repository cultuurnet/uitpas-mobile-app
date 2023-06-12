import styled from 'styled-components/native';

import { theme } from '../../_styles/theme';
import Typography from '../typography/Typography';

export const Handle = styled.TouchableOpacity`
  flex-direction: row;
  padding: 16px 0 8px;
  align-items: center;
  justify-content: flex-start;
  background-color: ${theme.palette.neutral['0']};
`;

export const Content = styled.View`
  padding: 8px 0;
`;

export const Label = styled(Typography)`
  margin-right: 6px;
  margin-bottom: 1px;
`;
