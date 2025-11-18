import styled from 'styled-components/native';

import Icon from '../../icon/Icon';
import Typography from '../../typography/Typography';
import PressableRipple from '../../pressable/PressableRipple';

export const Container = styled.View`
  flex-direction: row;
  align-items: center;
  background-color: ${({ theme }) => theme.palette.primary[700]};
  padding-vertical: 9px;
`;

export const FilterPrevButton = styled(Icon)`
  margin-left: 3px;
  margin-right: 8px;
`;

export const FilterNextButton = styled(Icon)`
  margin-right: 3px;
  margin-left: 8px;
`;

export const FilterItem = styled(PressableRipple)<{ isSelected: boolean }>`
  padding-horizontal: 16px;
  padding-vertical: 4px;
  background-color: ${({ isSelected, theme }) => (isSelected ? theme.palette.primary[900] : 'transparent')};
  border-radius: 20px;
`;

export const FilterLabel = styled(Typography)`
  line-height: 21px;
`;

export const Separator = styled.View`
  width: 8px;
`;
