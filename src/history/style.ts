import styled from 'styled-components/native';

import { Typography } from '../_components';
export const HISTORY_ITEM_HEIGHT = 90;

export const HistoryItem = styled.View`
  flex-direction: row;
  background: ${({ theme }) => theme.palette.neutral['0']};
  padding: 12px 16px;
  border-bottom-width: 0.25px;
  border-bottom-color: ${({ theme }) => theme.palette.neutral['200']};
`;

export const ListView = styled.View`
  flex: 1;
  justify-content: center;
  padding-top: 20px;
`;

export const InfoView = styled.View`
  align-self: center;
  margin-right: 20px;
  flex: 1;
`;

export const NoContentText = styled(Typography)`
  padding: 0 20px;
`;

export const HistoryIcon = styled.View`
  background: ${({ theme }) => theme.palette.primary['200']};
  padding: 10px;
  border-radius: 8px;
  margin-right: 16px;
  height: 40px;
  justify-content: center;
  align-items: center;
  align-self: center;
`;

export const Points = styled.View`
  margin-left: auto;
  align-items: flex-end;
  align-self: center;
`;
