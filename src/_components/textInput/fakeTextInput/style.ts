import styled from 'styled-components/native';

import PressableRipple from '../../pressable/PressableRipple';

export const Touchable = styled(PressableRipple)<{ isError?: boolean }>`
  height: 44px;
  justify-content: center;
  border-color: ${({ theme, isError }) => (!isError ? theme.palette.neutral['200'] : theme.palette.error['500'])};
  border-width: 1px;
  border-radius: 8px;
  padding-horizontal: 16px;
`;
