import { Image as ExpoImage } from 'expo-image';
import styled from 'styled-components/native';

export const Item = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding-vertical: 12px;
`;

export const Avatar = styled(ExpoImage)`
  width: 48px;
  height: 48px;
  border-radius: 24px;
`;

export const ItemBody = styled.View`
  flex: 1;
  justify-content: space-around;
  margin-left: 8px;
  margin-right: 12px;
`;

export const Divider = styled.View`
  width: 100%;
  height: 0.5px;
  background-color: ${({ theme }) => theme.palette.neutral['200']};
`;
