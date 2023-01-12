import styled from 'styled-components/native';

import { Button, Icon } from '../../_components';

export const BlurContainer = styled(Button)`
  align-items: center;
  background-color: rgba(0, 0, 0, 0.85);
  flex: 1;
  justify-content: center;
`;

export const CloseButton = styled(Icon)`
  padding: 5px;
  position: absolute;
  top: 7px;
  right: 7px;
`;

export const ModalContainer = styled.View`
  background-color: ${({ theme }) => theme.palette.secondary['500']};
  width: 100%;
  padding: 10px;
  border-radius: 10px;
  z-index: 1;
  position: relative;
`;

export const LogoContainer = styled.View`
  align-items: center;
  height: 100px;
  justify-content: center;
`;

export const BarcodeContainer = styled.View`
  align-items: center;
  background-color: ${({ theme }) => theme.palette.neutral['0']};
  border-radius: 10px;
  padding: 30px;
`;
