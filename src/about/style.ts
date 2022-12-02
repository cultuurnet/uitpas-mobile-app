import styled from 'styled-components/native';

import { LinkList } from '../_components';

export const ListContainer = styled(LinkList)`
  margin: 20px 0px;
`;

export const NotificationContainer = styled.View`
  margin: 20px 20px;
  background-color: ${({ theme }) => theme.palette.primary['300']};
  padding: 20px;
  border-radius: 10px;
`;
