import { SafeAreaView } from 'react-native-safe-area-context';
import styled from 'styled-components/native';

export const SafeAreaViewContainer = styled(SafeAreaView)`
  background-color: ${({ theme }) => theme.colors.white};
  flex-grow: 1;
`;

export const ScrollContainer = styled.ScrollView`
  background-color: ${({ theme }) => theme.colors.white};
`;
