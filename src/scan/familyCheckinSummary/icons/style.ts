import styled from 'styled-components/native';

export const Container = styled.View<{ type: 'success' | 'error' }>`
  width: 40px;
  height: 40px;
  border-radius: 20px;
  boder-width: 4px;
  border-color: ${({ type, theme }) => (type === 'success' ? theme.palette.primary['200'] : theme.palette.error['200'])};
  justify-content: center;
  align-items: center;
`;
