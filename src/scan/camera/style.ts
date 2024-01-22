import styled from 'styled-components/native';

export const Instruction = styled.View<{ bottom?: number; top?: number }>`
  position: absolute;
  bottom: ${({ bottom }) => (bottom ? `${bottom}px` : 'auto')};
  top: ${({ top }) => (top ? `${top}px` : 'auto')};
  left: 0;
  width: 100%;
  padding: 48px 16px;
  align-items: center;
`;
