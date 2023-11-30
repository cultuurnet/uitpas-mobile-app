import styled from 'styled-components/native';

import { theme } from '../../../_styles/theme';
import Typography from '../../typography/Typography';

export const Container = styled.TouchableOpacity`
  padding: 2px 4px 2px 8px;
  border-radius: 16px;
  align-items: center;
  justify-content: center;
  flex-direction: row;
  height: 32px;
  border: 2px solid ${theme.palette.neutral[0]};
`;

export const Points = styled(Typography)`
  margin-right: 4px;
`;

export const Avatar = styled.View`
  width: 20px;
  height: 20px;
  border-radius: 10px;
  background-color: ${theme.palette.neutral[0]};
  align-items: center;
  justify-content: center;
  text-align: center;
`;
