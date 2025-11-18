import styled from 'styled-components/native';

import { theme } from '../../../_styles/theme';
import { PressableRipple } from '../../../_components';

export const Container = styled(PressableRipple)`
  background-color: ${theme.palette.primary[600]};
  border-radius: 8px;
  flex-direction: row;
  align-items: center;
  padding: 12px;
  position: relative;
`;

export const Star = styled.Image`
  position: absolute;
  bottom: 0;
  top: 0;
  height: calc(100% + 24px);
  right: 0;
`;

export const ImageContainer = styled.View`
  height: 120px;
  width: 120px;
  border-radius: 8px;
  margin-right: 12px;
  align-self: flex-start;
`;

export const ContentContainer = styled.View`
  flex: 1;
`;

export const Badge = styled.View`
  background-color: ${theme.palette.error[600]};
  border-radius: 20px;
  padding: 2px 12px;
  align-self: flex-start;
  margin-bottom: 8px;
  elevation: 3;
  shadow-color: rgba(6, 59, 61, 0.15);
  shadow-offset: 2px 2px;
  shadow-opacity: 0.15;
  shadow-radius: 5px;
`;

export const TitleContainer = styled.View`
  margin-bottom: 8px;
`;

export const PointsAndLabelContainer = styled.View`
  flex-direction: row;
  align-items: center;
`;
