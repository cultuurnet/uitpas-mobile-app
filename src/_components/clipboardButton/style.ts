import styled from 'styled-components/native';

import { theme } from '../../_styles/theme';
import PressableHighlight from '../pressable/PressableHighlight';

export const Container = styled(PressableHighlight)`
  flex-direction: row;
  align-items: center;
  padding: ${theme.common.defaultSpacing}px;
  background-color: ${theme.palette.primary[100]};
  border-radius: ${theme.common.defaultSpacing}px;
  justify-content: space-between;
`;
