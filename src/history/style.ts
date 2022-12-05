import styled from 'styled-components/native';
export const HISTORY_ITEM_HEIGHT = 65;

export const HistoryItem = styled.View`
  flex-direction: row;
  background: ${({ theme }) => theme.palette.neutral['0']};
  padding: 12px 16px;
  border-bottom-width: 0.25px;
  border-bottom-color: ${({ theme }) => theme.palette.neutral['200']};
  height: ${HISTORY_ITEM_HEIGHT}px;
`;

export const ListView = styled.View`
  flex: 1;
  padding-top: 20px;
`;

export const HistoryIcon = styled.View`
  background: ${({ theme }) => theme.palette.primary['200']};
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
