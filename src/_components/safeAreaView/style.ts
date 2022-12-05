import { SafeAreaView } from 'react-native-safe-area-context';
import styled from 'styled-components/native';

import { ThemeColor } from '../../_styles/theme';
import { getColor } from '../../_utils/colorHelper';

export const SafeAreaViewContainer = styled(SafeAreaView)<{ backgroundColor: ThemeColor }>`
  background-color: ${({ backgroundColor }) => getColor(backgroundColor)};
  flex: 1;
`;
