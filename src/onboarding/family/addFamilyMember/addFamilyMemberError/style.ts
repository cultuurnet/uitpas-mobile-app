import styled from 'styled-components/native';

import { Typography } from '../../../../_components';

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
