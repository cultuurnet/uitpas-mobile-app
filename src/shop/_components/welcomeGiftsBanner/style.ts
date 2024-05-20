import styled from 'styled-components/native';

import { Typography } from '../../../_components';
import { theme } from '../../../_styles/theme';

export const Container = styled.TouchableHighlight`
  background-color: ${theme.palette.primary[700]};
  padding: ${theme.common.defaultSpacing}px;
  position: relative;
  overflow: hidden;
  flex-direction: row;
  align-items: flex-end;
  justify-content: space-between;
  min-height: 200px;
`;

export const TextContainer = styled.View`
  flex: 1;
`;

export const ArrowContainer = styled.View`
  width: 40px;
  height: 40px;
  align-items: center;
  justify-content: center;
  border-radius: 20px;
  background-color: ${theme.palette.neutral[900]};
`;

export const Gift = styled.Image`
  position: absolute;
  bottom: 0;
  right: 8px;
  width: 256px;
  resize-mode: cover;
`;

export const Title = styled(Typography)`
  line-height: 30px;
`;

export const Greeting = styled(Typography)`
  background-color: ${theme.palette.neutral[900]};
  padding: 1px 2px;
  margin-bottom: 8px;
  align-self: flex-start;
`;
