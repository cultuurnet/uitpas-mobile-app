import styled from 'styled-components/native';

import Button from '../button/Button';

export const LinkButton = styled(Button)`
  margin-left: 20px;
  flex: 1;
  align-items: flex-start;
`;

export const LinkContainer = styled.View`
  background-color: ${({ theme }) => theme.colors.white};
  border-bottom-color: ${({ theme }) => theme.colors.lightGrey};
  border-top-color: ${({ theme }) => theme.colors.lightGrey};
  border-bottom-width: 1px;
  border-top-width: 0.25px;
  margin: 20px 0px;
`;

export const LinkItem = styled.View`
  flex-direction: row;
  padding: 10px 20px;
  border-top-width: 0.5px;
  border-top-color: ${({ theme }) => theme.colors.lightGrey};
`;
