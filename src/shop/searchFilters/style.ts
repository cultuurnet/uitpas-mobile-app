import styled from 'styled-components/native';

import { Checkbox, SafeAreaView, Typography } from '../../_components';

export const Container = styled(SafeAreaView)`
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
  margin-top: auto;
  padding: 16px;
`;

export const FilterCheckbox = styled(Checkbox)`
  justify-content: space-between;
`;

export const SectionTitle = styled(Typography)`
  margin: 15px 0 5px;
`;
