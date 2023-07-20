import styled from 'styled-components/native';

import { Checkbox } from '../../_components';

export const Container = styled.ScrollView`
  padding: 24px 0;
`;

export const RegionFilter = styled.View`
  flex-direction: row;
  align-items: center;
  padding: 16px;
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
