import styled from 'styled-components/native';

import Button from '../button/Button';

export const LinkButton = styled(Button)`
  margin-left: 20px;
  flex: 1;
  align-items: flex-start;
`;

export const LinkContainer = styled.View`
  background-color: ${({ theme }) => theme.palette.neutral['0']};
  border-bottom-color: ${({ theme }) => theme.palette.neutral['200']};
  border-top-color: ${({ theme }) => theme.palette.neutral['200']};
  border-bottom-width: 1px;
  border-top-width: 0.25px;
  margin: 20px 0px;
`;

export const LinkItem = styled.View`
  flex-direction: row;
  padding: 16px 20px;
  border-top-width: 0.5px;
  border-top-color: ${({ theme }) => theme.palette.neutral['200']};
`;
