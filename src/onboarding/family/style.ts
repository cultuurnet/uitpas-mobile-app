import styled from 'styled-components/native';

import { BulletList as BulletListComp, Button, Typography } from '../../_components';

export const Body = styled.View`
  flex: 1
  padding-horizontal: 16px;
  align-items: center;
`;

export const Title = styled(Typography)`
  margin-top: 42px;
  margin-horizontal: 20px;
`;

export const Hero = styled.Image`
  margin-vertical: 25px;
`;

export const BulletList = styled.View`
  margin-horizontal: 16px;
`;

export const BulletListItem = styled(BulletListComp.Item)`
  margin-bottom: 16px;
`;

export const Footer = styled.View`
  padding-horizontal: 16px;
  padding-bottom: 16px;
`;

export const ConfirmButton = styled(Button)`
  margin-bottom: 16px;
`;

export const SkipButton = styled(Button)``;
