import styled from 'styled-components/native';

import { Button } from '../_components';

export const BottomContainer = styled.View`
  align-items: center;
  max-width: 280px;
  align-self: center;
  margin-bottom: auto;
`;

export const ErrorImage = styled.Image`
  margin: 60px 0;
  width: 156px;
  height: 156px;
`;

export const FamilyScanButton = styled(Button)`
  margin-top: 16px;
`;

export const CloseButton = styled(Button)`
  margin-top: 16px;
`;
