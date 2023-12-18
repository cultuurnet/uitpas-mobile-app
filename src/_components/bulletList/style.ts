import styled from 'styled-components/native';

export const BulletListItem = styled.View`
  width: 100%;
  flex-direction: row;
  align-items: center;
  margin-bottom: 40px;
`;

export const Disk = styled.View`
  width: 8px;
  height: 8px;
  border-radius: 4px;
  margin-right: 16px;
  background: ${({ theme }) => theme.palette.secondary['300']};
`;

export const Description = styled.View`
  flex: 1;
`;
