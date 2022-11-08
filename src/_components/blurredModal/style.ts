import styled from 'styled-components/native';

export const BlurContainer = styled.View`
  align-items: center;
  background-color: rgba(0, 0, 0, 0.3);
  flex: 1;
  justify-content: center;
`;

export const ModalContainer = styled.View`
  background-color: ${({ theme }) => {
    return theme.colors.white;
  }};
  height: 150px;
  padding: 20px;
  width: 90%;
  border-radius: 10;
`;
