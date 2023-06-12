import styled from 'styled-components/native';

import { Button, ClipboardButton, ExternalLink, Icon } from '../_components';
import { theme } from '../_styles/theme';

export const Content = styled.View`
  padding: 0 ${theme.common.defaultSpacing}px 40px;
`;

export const SuccessContainer = styled.View`
  flex-direction: row;
  align-items: center;
  padding: ${theme.common.defaultSpacing}px;
  background-color: ${theme.palette.secondary[600]};
  border-radius: 8px;
  margin-top: 24px;
`;

export const SuccessContent = styled.View`
  margin-left: ${theme.common.defaultSpacing}px;
  flex: 1;
`;

export const Spacer = styled.View`
  height: ${theme.common.defaultSpacing}px;
`;

export const CloseButton = styled(Button)`
  margin-top: ${theme.common.defaultSpacing}px;
`;

export const ExternalIcon = styled(Icon)`
  margin-left: 8px;
`;

export const CopyButton = styled(ClipboardButton)`
  margin-bottom: 24px;
`;

export const LinkButton = styled(Button)`
  flex-direction: row;
  justify-content: center;
  margin-bottom: 24px;
`;

export const LinkInlineButton = styled(ExternalLink)`
  margin-bottom: 24px;
`;
