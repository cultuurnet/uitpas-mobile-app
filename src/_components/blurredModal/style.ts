import styled from 'styled-components/native';

export const BlurContainer = styled.View`
  align-items: center;
  background-color: ${({ theme }) => theme.colors.blurredBlack};
  flex: 1;
  justify-content: center;
`;

export const ModalContainer = styled.View`
  background-color: ${({ theme }) => theme.colors.white};
  height: 150px;
  width: 90%;
  padding: 15px;
  border-radius: 10px;
`;
