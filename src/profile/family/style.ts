import styled from 'styled-components/native';

import { SafeAreaView as SafeAreaViewComponent, TouchableRipple, Typography } from '../../_components';

export const FamilyTile = styled(TouchableRipple)<{ isFirst: boolean }>`
  background-color: ${({ theme }) => theme.palette.neutral['0']};
  border-color: ${({ theme }) => theme.palette.neutral['200']};
  border-width: ${({ isFirst }) => (isFirst ? '0.5px' : '0px')};
  border-bottom-width: 0.5px;
  flex-direction: row;
  justify-content: space-between;
  padding: 16px;
`;

export const FamilyTileBody = styled.View`
  flex: 1;
  margin-left: 12px;
`;

export const FamilyTileDescription = styled(Typography)`
  margin-top: 8px;
`;

export const SafeAreaView = styled(SafeAreaViewComponent)`
  padding-top: 12px;
`;
