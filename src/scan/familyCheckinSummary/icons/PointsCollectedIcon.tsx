import * as Styled from './style';

type TProps = {
  number: number;
};

export const PointsCollectedIcon = ({ number }: TProps) => {
  return (
    <Styled.Container type="success">
      <Styled.Label color="primary.700" fontStyle="bold" size="small">
        +{number}
      </Styled.Label>
    </Styled.Container>
  );
};
