import * as Styled from './style';

type TProps = {
  count: number;
};

export const PointsRedeemedIcon = ({ count }: TProps) => {
  return (
    <Styled.Container type="success">
      <Styled.Label color="primary.700" fontStyle="bold" size="small">
        +{count}
      </Styled.Label>
    </Styled.Container>
  );
};
