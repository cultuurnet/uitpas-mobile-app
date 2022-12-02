import styled from 'styled-components/native';

export const BulletListItem = styled.View`
  flex-direction: row;
  align-items: center;
  margin-bottom: 32px;
`;

export const Disk = styled.View`
  width: 8px;
  height: 8px;
  border-radius: 4px;
  margin-right: 16px;
  background: ${({ theme }) => theme.palette.secondary['300']};
`;
