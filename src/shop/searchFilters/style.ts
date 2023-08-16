import styled from 'styled-components/native';

import { Button as ButtonComponent, Checkbox, Typography } from '../../_components';

export const Container = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.palette.neutral['0']};
`;

export const RegionFilter = styled.View`
  flex-direction: row;
  align-items: center;
  padding: 0 16px;
`;

export const RegionFilterText = styled.View`
  margin-right: 12px;
  flex: 1;
`;

export const Actions = styled.View`
  margin-top: auto;
  padding: 16px;
`;

export const Button = styled(ButtonComponent)`
  margin-bottom: 8px;
`;

export const FilterCheckbox = styled(Checkbox)<{ isLast: boolean }>`
  justify-content: space-between;
  padding: 16px;
  border-style: solid;
  border-bottom-width: 0.5px;
  border-bottom-color: ${({ theme, isLast }) => (isLast ? 'transparent' : theme.palette.neutral['200'])};
`;

export const SectionTitle = styled(Typography)`
  padding: 0 16px;
  margin-top: 24px;
`;
