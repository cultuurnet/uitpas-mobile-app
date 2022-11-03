import styled from 'styled-components/native';

export const Content = styled.View<{ borderless?: boolean }>`
  overflow: ${({ borderless }) => borderless && 'hidden'};
`;
