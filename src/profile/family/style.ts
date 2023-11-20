import styled from 'styled-components/native';

import { SafeAreaView as SafeAreaViewComponent, TouchableRipple } from '../../_components';

export const FamilyTile = styled(TouchableRipple)`
  background-color: ${({ theme }) => theme.palette.neutral['0']};
  border-color: ${({ theme }) => theme.palette.neutral['200']};
  border-width: 0.5px;
  flex-direction: row;
  justify-content: space-between;
  padding: 16px;
`;

export const SafeAreaView = styled(SafeAreaViewComponent)`
  padding-top: 12px;
`;
