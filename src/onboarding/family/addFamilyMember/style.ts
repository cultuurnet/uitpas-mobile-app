import { KeyboardAvoidingView } from 'react-native';
import styled from 'styled-components/native';

import { Button, DatePicker, TextInput, Tooltip, Typography } from '../../../_components';
import { theme } from '../../../_styles/theme';

export const ScreenContainer = styled(KeyboardAvoidingView)`
  flex: 1;
`;

export const InnerContainer = styled.ScrollView`
  padding: 16px;
`;

export const Form = styled.View`
  flex: 1;
`;

export const FormBody = styled.View`
  flex: 1;
`;

export const UitpasNumberInput = styled(TextInput)`
  margin-bottom: 16px;
`;

export const UitpasNumberLabelContainer = styled.View`
  flex-direction: row;
  align-items: center;
`;

export const UitpasNumberLabel = styled(Typography)`
  font-size: 12px;
  line-height: 18px;
`;

export const UitpasNumberDescriptionLink = styled(Typography)`
  text-decoration: underline;
  text-decoration-color: ${theme.palette.primary['700']};
`;

export const UitpasNumberTooltip = styled(Tooltip)`
  margin-left: 4px;
`;

export const BirthDateInput = styled(DatePicker)`
  margin-bottom: 16px;
`;

export const FormError = styled(Typography)`
  font-size: 12px;
  line-height: 18px;
`;

export const StickyFooter = styled.View`
  padding: 16px;
`;

export const CancelButton = styled(Button)`
  margin-top: 16px;
`;
