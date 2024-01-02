import { Typography } from '../../../_components';
import * as Styled from './style';

export const CheckinErrorIcon = () => {
  return (
    <Styled.Container type="error">
      <Typography color="error.500" fontStyle="bold" size="large">
        !
      </Typography>
    </Styled.Container>
  );
};
