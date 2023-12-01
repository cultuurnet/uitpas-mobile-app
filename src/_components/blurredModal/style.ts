import styled from 'styled-components/native';

import Button from '../button/Button';

export const BlurContainer = styled(Button)`
  align-items: center;
  background-color: rgba(0, 0, 0, 0.3);
  flex: 1;
  justify-content: center;
  padding: 16px;
`;

export const ModalContainer = styled.View`
  background-color: ${({ theme }) => theme.palette.neutral['0']};
  padding: 16px;
  border-radius: 8px;
  z-index: 1;
`;
