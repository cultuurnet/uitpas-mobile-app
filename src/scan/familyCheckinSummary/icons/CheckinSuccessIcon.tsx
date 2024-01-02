import { Typography } from '../../../_components';
import * as Styled from './style';

type TProps = {
  numberOfPoints: number;
};

export const CheckinSuccessIcon = ({ numberOfPoints }: TProps) => {
  return (
    <Styled.Container type="success">
      <Typography color="primary.700" fontStyle="bold" size="small">
        +{numberOfPoints}
      </Typography>
    </Styled.Container>
  );
};
