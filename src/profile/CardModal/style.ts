import styled from 'styled-components/native';

import { Button } from '../../_components';
import { theme } from '../../_styles/theme';

export const BlurContainer = styled(Button)`
  align-items: center;
  background-color: rgba(0, 0, 0, 0.85);
  flex: 1;
  justify-content: center;
`;

export const CloseButton = styled.Pressable`
  align-items: center;
  justify-content: center;
  margin-top: -42px; 
  width: 32px;
  height: 32px;
  border-radius: 16px;
  border: 2px solid ${theme.palette.neutral[0]};
  align-self: flex-end;
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
