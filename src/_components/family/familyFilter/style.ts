import styled from 'styled-components/native';

import Icon from '../../icon/Icon';
import TouchableRipple from '../../touchableRipple/TouchableRipple';

export const Container = styled.View`
  flex-direction: row;
  align-items: center;
  background-color: ${({ theme }) => theme.palette.primary[700]};
  padding-vertical: 8px;
`;

export const FilterPrevButton = styled(Icon)`
  margin-right: 8px;
`;

export const FilterNextButton = styled(Icon)`
  margin-left: 8px;
`;

export const FilterItem = styled(TouchableRipple)<{ isSelected: boolean }>`
  padding-horizontal: 8px;
  padding-vertical: 4px;
  background-color: ${({ isSelected, theme }) => (isSelected ? theme.palette.primary[900] : 'transparent')}};
  border-radius: 20px;
`;

export const Separator = styled.View`
  width: 8px;
`;
