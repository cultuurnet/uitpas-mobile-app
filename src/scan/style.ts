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
  border-color: ${({ theme }) => theme.palette.primary['200']};
  width: 80px;
  height: 80px;
  align-items: center;
  justify-content: center;
  border-radius: 40px;
  overflow: hidden;
`;
