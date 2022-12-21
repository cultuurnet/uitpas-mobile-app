import styled from 'styled-components/native';

import Button from '../button/Button';

export const BlurContainer = styled(Button)`
  align-items: center;
  background-color: rgba(0, 0, 0, 0.3);
  flex: 1;
  justify-content: center;
`;

export const ModalContainer = styled.View`
  background-color: ${({ theme }) => theme.palette.neutral['0']};
  width: 90%;
  padding: 20px;
  border-radius: 10px;
  z-index: 1;
`;
