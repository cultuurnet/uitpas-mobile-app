import styled from 'styled-components/native';

export const NotificationContainer = styled.View`
  margin: 15px 15px;
  background-color: ${({ theme }) => theme.palette.primary['300']};
  padding: 20px;
  border-radius: 10px;
`;
