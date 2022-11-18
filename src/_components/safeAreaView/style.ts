import { SafeAreaView } from 'react-native-safe-area-context';
import styled from 'styled-components/native';

export const SafeAreaViewContainer = styled(SafeAreaView)`
  background-color: ${({ theme }) => theme.colors.background};
  flex: 1;
`;
