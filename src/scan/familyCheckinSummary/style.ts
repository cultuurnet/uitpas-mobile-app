import { Image } from 'react-native';
import styled from 'styled-components/native';

import { Button, FamilyMembersPoints as FamilyMembersPointsComp } from '../../_components';

export const Header = styled.View`
  position: absolute;
  width: 100%;
  align-items: center;
`;

export const HeaderImage = styled(Image)`
  width: 80px;
  height: 80px;
  border-radius: 40px;
`;

export const Body = styled.View`
  flex: 1;
  margin-top: 40px;
`;

export const FamilyMembersPoints = styled(FamilyMembersPointsComp)`
  padding-horizontal: 16px;
`;

export const CloseButton = styled(Button)`
  margin: 16px;
  margin-bottom: 0px;
`;
