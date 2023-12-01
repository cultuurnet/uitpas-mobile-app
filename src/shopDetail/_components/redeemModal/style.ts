import styled from 'styled-components/native';

import { Button } from '../../../_components';

export const MemberContainer = styled.View`
  margin-top: 12px;
`;

export const MemberCard = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  border-radius: 8px;
  background-color: ${({ theme }) => theme.palette.neutral['100']};
  padding: 8px;
  margin-top: 8px;
`;

export const MemberAvatar = styled.Image`
  width: 48px;
  height: 48px;
  border-radius: 24px;
  border: ${({ theme }) => `4px solid ${theme.palette.neutral['0']}`};
`;

export const MemberBody = styled.View`
  flex: 1;
  justify-content: space-around;
  margin-left: 8px;
  margin-right: 12px;
`;

export const ButtonContainer = styled.View`
  margin-top: 32px;
`;

export const FirstButton = styled(Button)`
  margin-bottom: 8px;
`;
