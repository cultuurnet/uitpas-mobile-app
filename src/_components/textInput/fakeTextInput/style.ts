import styled from 'styled-components/native';

import TouchableRipple from '../../touchableRipple/TouchableRipple';

export const Touchable = styled(TouchableRipple)<{ isError?: boolean }>`
  border-color: ${({ theme, isError }) => (!isError ? theme.palette.neutral['200'] : theme.palette.error['500'])};
  border-width: 1px;
  border-radius: 8px;
  height: 44px;
  padding-horizontal: 16px;
  padding-vertical: 12px;
`;
