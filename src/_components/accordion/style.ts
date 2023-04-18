import styled from 'styled-components/native';

import { theme } from '../../_styles/theme';

export const Handle = styled.TouchableOpacity`
  flex-direction: row;
  padding: 8px 12px;
  align-items: center;
  justify-content: center;
  background-color: ${theme.palette.neutral['0']};
`;

export const Content = styled.View`
  padding: 8px 0;
`;
