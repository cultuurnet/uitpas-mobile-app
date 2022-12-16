import styled from 'styled-components/native';

import { Button } from '../../_components';

export const BlurContainer = styled(Button)`
  align-items: center;
  background-color: rgba(0, 0, 0, 0.6);
  flex: 1;
  justify-content: center;
`;

export const ModalContainer = styled.View`
  background-color: ${({ theme }) => theme.palette.secondary['500']};
  width: 100%;
  padding: 10px;
  border-radius: 10px;
  z-index: 1;
`;
