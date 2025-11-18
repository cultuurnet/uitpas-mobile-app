import styled from 'styled-components/native';
import { Image as ExpoImage } from 'expo-image';

export const Card = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  border-radius: 8px;
  background-color: ${({ theme }) => theme.palette.neutral['100']};
  padding: 8px;
  margin-top: 8px;
`;

export const Avatar = styled(ExpoImage)`
  width: 48px;
  height: 48px;
  border-radius: 24px;
  border-width: 4px;
  border-color: ${({ theme }) => theme.palette.neutral['0']};
`;

export const Body = styled.View`
  flex: 1;
  justify-content: space-around;
  margin-left: 8px;
  margin-right: 12px;
`;
