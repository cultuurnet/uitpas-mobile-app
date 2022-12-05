import styled from 'styled-components/native';

import { Typography } from '../_components';
export const HISTORY_ITEM_HEIGHT = 65;

export const HistoryItem = styled.View`
  flex-direction: row;
  background: ${({ theme }) => theme.colors.white};
  padding: 12px 16px;
  border-bottom-width: 0.25px;
  border-bottom-color: ${({ theme }) => theme.colors.lightGrey};
  height: ${HISTORY_ITEM_HEIGHT}px;
`;

export const ListView = styled.View`
  flex: 1;
  justify-content: center;
  padding-top: 20px;
`;

export const NoContentText = styled(Typography)`
  padding: 0 20px;
  text-align: center;
`;

export const HistoryIcon = styled.View`
  background: ${({ theme }) => theme.colors.lightestGreen};
  padding: 10px;
  border-radius: 8px;
  margin-right: 16px;
  justify-content: center;
  align-items: center;
`;

export const Points = styled.View`
  margin-left: auto;
  align-items: flex-end;
`;
