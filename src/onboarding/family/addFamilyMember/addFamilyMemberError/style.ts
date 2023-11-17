import styled from 'styled-components/native';

import { SafeAreaView, Typography } from '../../../../_components';
import { theme } from '../../../../_styles/theme';

export const SafeAreaViewContainer = styled(SafeAreaView)`
  background-color: ${theme.palette.neutral['0']};
`;

export const Body = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  padding: 16px;
`;

export const Title = styled(Typography)`
  margin-top: 16px;
  line-height: 30px;
`;

export const Description = styled(Typography)`
  margin-top: 16px;
`;

export const Footer = styled.View`
  padding: 16px;
`;
