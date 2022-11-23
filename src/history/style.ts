import styled from 'styled-components/native';

export const HistoryItem = styled.View`
  flex-direction: row;
  background: ${({ theme }) => theme.colors.white};
  padding: 12px 16px;
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
