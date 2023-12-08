import styled from 'styled-components/native';

import { Typography } from '../../../_components';

export const Tile = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 16px;
  background-color: ${({ theme }) => theme.palette.neutral[0]};
`;

export const Body = styled.View`
  flex: 1;
`;

export const Name = styled(Typography)`
  margin-bottom: 4px;
`;

export const Email = styled(Typography)`
  margin-bottom: 4px;
`;

export const DateAdded = styled(Typography)`
  font-size: 12px;
  line-height: 18px;
`;

export const LeaveFamily = styled.View`
  margin-left: 16px;
`;

export const Separator = styled.View`
  width: 100%;
  height: 0.5px;
  color: ${({ theme }) => theme.palette.neutral[200]};
`;
