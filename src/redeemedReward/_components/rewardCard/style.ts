import styled from 'styled-components/native';

import { Icon, RewardImage, TouchableRipple } from '../../../_components';
import { theme } from '../../../_styles/theme';

export const Container = styled(TouchableRipple)`
  background-color: ${theme.palette.neutral[0]};
  border-radius: 16px;
  border-width: 8px;
  border-color: ${theme.palette.primary[800]};
  padding: ${theme.common.defaultSpacing}px;
  elevation: 1;
  margin: 24px 0;
  flex-direction: row;
  shadow-color: rgba(6, 59, 61, 0.1);
  shadow-offset: 4px 4px;
  shadow-opacity: 0.1;
  shadow-radius: 10px;
  align-items: center;
  position: relative;
`;

export const Image = styled(RewardImage)`
  width: 70px;
  height: 70px;
`;
export const Arrow = styled(Icon)`
  position: absolute;
  bottom: 8px;
  right: 8px;
`;

export const TextContainer = styled.View`
  margin-left: ${theme.common.defaultSpacing}px;
  flex: 1;
`;
