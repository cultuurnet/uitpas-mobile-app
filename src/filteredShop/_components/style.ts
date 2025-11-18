import { Image as ExpoImage } from 'expo-image';
import styled from 'styled-components/native';

import { theme } from '../../_styles/theme';

export const Container = styled.View`
  background-color: ${theme.palette.primary[700]};
  padding: ${theme.common.defaultSpacing}px;
  position: relative;
  overflow: hidden;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  min-height: 96px;
  margin-bottom: 24px;
`;

export const Gift = styled(ExpoImage)`
  position: absolute;
  bottom: 0px;
  right: 8px;
  width: 116px;
  height: 86px;
`;
