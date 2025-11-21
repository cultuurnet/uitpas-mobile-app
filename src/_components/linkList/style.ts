import styled from 'styled-components/native';

import PressableRipple from '../pressable/PressableRipple';
import Typography from '../typography/Typography';

export const LinkButton = styled(PressableRipple)`
  flex: 1;
  align-items: center;
  flex-direction: row;
  padding: 16px 20px;
`;

export const LinkText = styled(Typography)`
  margin-left: 20px;
`;

export const UnderlinedLinkText = styled(Typography)`
  margin-left: 20px;
  flex: 1;
`;

export const HeaderText = styled(Typography)`
  padding: 16px 20px;
`;

export const LinkContainer = styled.View`
  background-color: ${({ theme }) => theme.palette.neutral['0']};
  border-bottom-color: ${({ theme }) => theme.palette.neutral['200']};
  border-top-color: ${({ theme }) => theme.palette.neutral['200']};
  border-bottom-width: 1px;
  border-top-width: 0.25px;
  margin: 20px 0px 0px;
`;

export const LinkItem = styled.View`
  flex-direction: row;
  border-top-width: 0.5px;
  border-top-color: ${({ theme }) => theme.palette.neutral['200']};
`;
