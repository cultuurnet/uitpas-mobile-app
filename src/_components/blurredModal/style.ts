import styled from 'styled-components/native';

export const BlurContainer = styled.View`
  align-items: center;
  background-color: rgba(0, 0, 0, 0.3);
  flex: 1;
  justify-content: center;
`;

export const ModalContainer = styled.View`
  background-color: ${({ theme }) => theme.palette.neutral['0']};
  height: 150px;
  width: 90%;
  padding: 15px;
  border-radius: 10px;
`;
