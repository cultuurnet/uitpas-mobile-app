import styled from 'styled-components/native';

export const BottomContainer = styled.View`
  align-items: center;
  max-width: 280px;
  align-self: center;
  margin-bottom: auto;
`;

export const SavedPoints = styled.View`
  margin-bottom: 24px;
  border-width: 5px;
  border-color: ${({ theme }) => theme.colors.lightestGreen};
  width: 60px;
  height: 60px;
  align-items: center;
  justify-content: center;
  border-radius: 30px;
  overflow: hidden;
`;

export const ErrorImage = styled.Image`
  margin: 60px 0;
  width: 156px;
  height: 156px;
`;
