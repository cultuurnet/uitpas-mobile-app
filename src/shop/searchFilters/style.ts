import styled from 'styled-components/native';

import { Checkbox, SafeAreaView, Typography } from '../../_components';

export const Container = styled(SafeAreaView)`
  background-color: ${({ theme }) => theme.palette.neutral[0]};
  padding: 0px 16px;
`;

export const RegionFilter = styled.View`
  flex-direction: row;
  align-items: center;
`;

export const RegionFilterText = styled.View`
  margin-right: 12px;
  flex: 1;
`;

export const Actions = styled.View`
  margin-top: 16px;
`;

export const FilterCheckbox = styled(Checkbox)`
  justify-content: space-between;
  padding: 15px 0px;
  border-style: solid;
  border-bottom-width: 1px;
  border-bottom-color: ${({ theme }) => theme.palette.neutral['200']};
`;

export const SectionTitle = styled(Typography)`
  margin: 15px 0px 0px;
`;
